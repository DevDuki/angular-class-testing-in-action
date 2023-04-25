import { TestBed } from '@angular/core/testing';

import { RegistrationService } from './registration.service';
import { RegistrationDetails } from '../_types/registration-details.type';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { RouterAdapterService } from '../_services/adapters/router-adapter/router-adapter.service';
import { appRoutesNames } from '../app.routes.names';
import { UserRemoteService } from '../_services/user-remote/user-remote.service';
import { LlamaRemoteService } from '../_services/llama-remote/llama-remote.service';

describe('RegistrationService', () => {
  let serviceUnderTest: RegistrationService;

  let routerAdapterServiceSpy: Spy<RouterAdapterService>;
  let userRemoteServiceSpy: Spy<UserRemoteService>;
  let llamaRemoteServiceSpy: Spy<LlamaRemoteService>;

  Given(() => {
    TestBed.configureTestingModule({
      providers: [
        RegistrationService,
        { provide: RouterAdapterService, useValue: createSpyFromClass(RouterAdapterService) },
        { provide: UserRemoteService, useValue: createSpyFromClass(UserRemoteService) },
        { provide: LlamaRemoteService, useValue: createSpyFromClass(LlamaRemoteService) },
      ]
    });

    serviceUnderTest = TestBed.inject(RegistrationService);

    routerAdapterServiceSpy = TestBed.inject(RouterAdapterService) as Spy<RouterAdapterService>;
    userRemoteServiceSpy = TestBed.inject(UserRemoteService) as Spy<UserRemoteService>;
    llamaRemoteServiceSpy = TestBed.inject(LlamaRemoteService) as Spy<LlamaRemoteService>;
  });

  describe('METHOD: registerNewUser', () => {
    let fakeRegistrationDetails: RegistrationDetails;

    When(() => {
      serviceUnderTest.registerNewUser(fakeRegistrationDetails);
    });

    describe(`GIVEN user and llama created successfully
              THEN redirect to login`, () => {
      Given(() => {
        fakeRegistrationDetails = {
          user: {
            email: 'fake@email.com',
            password: 'FAKE PASSWORD'
          },
          llama: {
            name: 'FAKE NAME',
            imageFileName: 'FAKE IMAGE FILE NAME'
          }
        };

        const returnedUserId: number = 1;

        userRemoteServiceSpy.create
          .mustBeCalledWith(fakeRegistrationDetails.user)
          .resolveWith(returnedUserId);

        const llamaWithUserId = {
          ...fakeRegistrationDetails.llama,
          userId: returnedUserId
        };

        llamaRemoteServiceSpy.create
          .mustBeCalledWith(llamaWithUserId)
          .resolveWith();
      });

      Then(() => {
        expect(routerAdapterServiceSpy.goToUrl).toHaveBeenCalledWith(`/${appRoutesNames.LOGIN}`);
      });
    });
  });
});
