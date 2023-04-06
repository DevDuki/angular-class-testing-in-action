import { TestBed, fakeAsync } from '@angular/core/testing';
import { Spy, createSpyFromClass } from 'jasmine-auto-spies';
import { UserRemoteService } from '../_services/user-remote/user-remote.service';
import { LoginService, ERROR_IN_LOGIN_MESSAGE } from './login.service';
import { UserCredentials } from '../_types/user-credentials.type';
import { LlamaStateService } from '../_services/llama-state/llama-state.service';
import { RouterAdapterService } from '../_services/adapters/router-adapter/router-adapter.service';
import { AppError } from '../_types/app-error';
import { GlobalErrorHandlerService } from '../_services/global-error-handler/global-error-handler.service';

describe('LoginService', () => {
  let serviceUnderTest: LoginService;
  let userRemoteServiceSpy: Spy<UserRemoteService>;
  let llamaStateServiceSpy: Spy<LlamaStateService>;
  let routerAdapterServiceSpy: Spy<RouterAdapterService>;
  let globalErrorHandlerServiceSpy: Spy<GlobalErrorHandlerService>;

  let actualResult: any;

  Given(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginService,
        { provide: UserRemoteService, useValue: createSpyFromClass(UserRemoteService) },
        { provide: LlamaStateService, useValue: createSpyFromClass(LlamaStateService) },
        {
          provide: RouterAdapterService,
          useValue: createSpyFromClass(RouterAdapterService)
        },
        { provide: GlobalErrorHandlerService, useValue: createSpyFromClass(GlobalErrorHandlerService) },
      ]
    });

    serviceUnderTest = TestBed.inject(LoginService);
    userRemoteServiceSpy = TestBed.inject<any>(UserRemoteService);
    llamaStateServiceSpy = TestBed.inject<any>(LlamaStateService);
    routerAdapterServiceSpy = TestBed.inject<any>(RouterAdapterService);
    globalErrorHandlerServiceSpy = TestBed.inject<any>(GlobalErrorHandlerService);

    actualResult = undefined;
  });

  describe('METHOD: login', () => {
    let fakeCredentials: UserCredentials;
    let fakeUserId: number;

    When(
      fakeAsync(() => {
        serviceUnderTest.login(fakeCredentials);
      })
    );

    describe(`GIVEN authentication is successful
              THEN load user llama and redirect to front page`, () => {
      Given(() => {
        fakeCredentials = {
          email: 'FAKE@EMAIL.com',
          password: 'FAKE PASSWORD'
        };

        fakeUserId = 33333333;

        userRemoteServiceSpy.authenticate
          .mustBeCalledWith(fakeCredentials)
          .resolveWith(fakeUserId);

        llamaStateServiceSpy.loadUserLlama.mustBeCalledWith(fakeUserId).resolveWith();
      });
      Then(() => {
        expect(routerAdapterServiceSpy.goToUrl).toHaveBeenCalledWith('/');
      });
    });

    describe(`GIVEN authentication failed
              THEN report error globally`, () => {
      Given(() => {
        userRemoteServiceSpy.authenticate.and.rejectWith('FAKE REMOTE ERROR');
      });
      Then(() => {
        const expectedError: AppError = {
          text: ERROR_IN_LOGIN_MESSAGE,
          originalError: 'FAKE REMOTE ERROR'
        };
        expect(globalErrorHandlerServiceSpy.handleError).toHaveBeenCalledWith(
          expectedError
        );
      });
    });

    describe(`GIVEN authentication is successful
              THEN load user llama and redirect to front page`, () => {
      Given(() => {
        fakeCredentials = {
          email: 'FAKE@EMAIL.com',
          password: 'FAKE PASSWORD'
        };

        fakeUserId = 33333333;

        userRemoteServiceSpy.authenticate
          .mustBeCalledWith(fakeCredentials)
          .resolveWith(fakeUserId);

        llamaStateServiceSpy.loadUserLlama.mustBeCalledWith(fakeUserId).rejectWith('FAKE REMOTE ERROR');
      });
      Then(() => {
        const expectedError: AppError = {
          text: ERROR_IN_LOGIN_MESSAGE,
          originalError: 'FAKE REMOTE ERROR'
        };
        expect(globalErrorHandlerServiceSpy.handleError).toHaveBeenCalledWith(
          expectedError
        );
      });
    });
  });
});
