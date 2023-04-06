import { TestBed, fakeAsync } from '@angular/core/testing';
import { Spy, createSpyFromClass } from 'jasmine-auto-spies';
import { RouterAdapterService } from '../_services/adapters/router-adapter/router-adapter.service';
import { RegistrationService } from './registration.service';
import { appRoutesNames } from '../app.routes.names';
import { RegistrationDetails } from '../_types/registration-details.type';
import { UserRemoteService } from '../_services/user-remote/user-remote.service';
import { LlamaRemoteService } from '../_services/llama-remote/llama-remote.service';

describe('RegistrationService', () => {
  let serviceUnderTest: RegistrationService;

  let routerAdapterServiceSpy: Spy<RouterAdapterService>;
  let userRemoteServiceSpy: Spy<UserRemoteService>;
  let LlamaRemoteServiceSpy: Spy<LlamaRemoteService>;
  
  

  let actualResult: any;

  Given(() => {
    TestBed.configureTestingModule({
      providers: [
        RegistrationService,
        {
          provide: RouterAdapterService,
          useValue: createSpyFromClass(RouterAdapterService)
        },
        { provide: UserRemoteService, useValue: createSpyFromClass(UserRemoteService) },
        { provide: LlamaRemoteService, useValue: createSpyFromClass(LlamaRemoteService) },
      ]
    });

    serviceUnderTest = TestBed.inject(RegistrationService);
    routerAdapterServiceSpy = TestBed.inject<any>(RouterAdapterService);
    userRemoteServiceSpy = TestBed.inject<any>(UserRemoteService);
    LlamaRemoteServiceSpy = TestBed.inject<any>(LlamaRemoteService);

    actualResult = undefined;
  });

  describe('METHOD: registerNewUser', () => {
    let fakeRegistrationDetails: RegistrationDetails;

    When(fakeAsync(() => {
      serviceUnderTest.registerNewUser(fakeRegistrationDetails);
    }));

    describe(`GIVEN user and llama created successfully
              THEN redirect to login`, () => {
      Given(() => {
        fakeRegistrationDetails = {
          user: {
            email: 'fake@fake.com',
            password: 'FAKE PASSWORD'
          },
          llama: {
            name: 'FAKE NAME',
            imageFileName: 'FAKE IMAGE FILE NAME'
          }
        };

        const returnedUserId: number = 333333;

        userRemoteServiceSpy.create
          .mustBeCalledWith(fakeRegistrationDetails.user)
          .resolveWith(returnedUserId);

        const llamaWithUserId = {
          ...fakeRegistrationDetails.llama,
          userId: returnedUserId
        };

        LlamaRemoteServiceSpy.create
          .mustBeCalledWith(llamaWithUserId)
          .resolveWith();
        
      });
      Then(() => {
        expect(routerAdapterServiceSpy.goToUrl).toHaveBeenCalledWith(`/${appRoutesNames.LOGIN}`);
      });
    });
  });
});
