import { TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { UserCredentials } from '../_types/user-credentials.type';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { LoginService } from './login.service';

describe('LoginComponent', () => {
  let componentUnderTest: LoginComponent;

  let loginServiceSpy: Spy<LoginService>;

  Given(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginComponent,
        { provide: LoginService, useValue: createSpyFromClass(LoginService) }
      ]
    });

    componentUnderTest = TestBed.inject(LoginComponent);

    loginServiceSpy = TestBed.inject(LoginService) as Spy<LoginService>;
  });

  describe('METHOD: handleLogin', () => {
    let fakeCredentials: UserCredentials;

    When(() => {
      componentUnderTest.handleLogin();
    });

    describe('GIVEN form data is valid THEN pass credentials to the service', () => {
      Given(() => {
        fakeCredentials = { email: 'FAKE EMAIL', password: 'FAKE PASSWORD' };

        componentUnderTest.loginForm.setValue(fakeCredentials);
      });

      Then(() => {
        expect(loginServiceSpy.login).toHaveBeenCalledWith(fakeCredentials);
      });
    });
  });
});
