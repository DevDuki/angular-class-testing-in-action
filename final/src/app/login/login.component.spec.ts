import { TestBed } from '@angular/core/testing';
import { Spy, createSpyFromClass } from 'jasmine-auto-spies';
import { LoginComponent } from './login.component';
import { UserCredentials } from '../_types/user-credentials.type';
import { LoginService } from './login.service';
import { appRoutesNames } from '../app.routes.names';

describe('LoginComponent', () => {
  let componentUnderTest: LoginComponent;

  let loginServiceSpy: Spy<LoginService>;

  let fakeValue: any;

  Given(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginComponent,
        { provide: LoginService, useValue: createSpyFromClass(LoginService) }
      ]
    });

    componentUnderTest = TestBed.inject(LoginComponent);
    loginServiceSpy = TestBed.inject<any>(LoginService);

    fakeValue = undefined;
  });

  describe('INIT', () => {
    Then(() => {
      expect(componentUnderTest.registerLink).toEqual(`/${appRoutesNames.REGISTER}`);
    });
  });

  describe('EVENT: email changed', () => {

    When(() => {
      componentUnderTest.emailControl.setValue(fakeValue);
    });
    
    describe('GIVEN email is empty THEN email validation should fail', () => {
    
      Given(() => {
        fakeValue = '';
      });
      Then(() => {
        expect(componentUnderTest.emailControl.valid).toBeFalsy();
      });
    });

    describe('GIVEN email is not a valid email THEN email validation should fail', () => {
    
      Given(() => {
        fakeValue = 'NOT AN EMAIL';
      });
      Then(() => {
        expect(componentUnderTest.emailControl.valid).toBeFalsy();
      });
    });
  });

  describe('EVENT: password changed', () => {

    When(() => {
      componentUnderTest.passwordControl.setValue(fakeValue);
    });
    
    describe('GIVEN password is empty THEN password validation should fail', () => {
    
      Given(() => {
        fakeValue = '';
      });
      Then(() => {
        expect(componentUnderTest.passwordControl.valid).toBeFalsy();
      });
    });

    describe('GIVEN password is too short THEN password validation should fail', () => {
    
      Given(() => {
        fakeValue = '1234567';
      });
      Then(() => {
        expect(componentUnderTest.passwordControl.valid).toBeFalsy();
      });
    });
  });

  describe('METHOD: handleLogin', () => {
    let fakeCredentials: UserCredentials;

    When(() => {
      componentUnderTest.handleLogin();
    });

    describe('GIVEN form data is valid THEN pass the credentials to service', () => {
      Given(() => {
        fakeCredentials = { email: 'FAKE@EMAIL.com', password: 'FAKE PASSWORD' };
        componentUnderTest.loginForm.setValue(fakeCredentials);
      });
      Then(() => {
        expect(loginServiceSpy.login).toHaveBeenCalledWith(fakeCredentials);
      });
    });

    describe('GIVEN form data is invalid THEN do not pass on credentials to service', () => {
      Given(() => {
        fakeCredentials = {
          email: '',
          password: ''
        };
        componentUnderTest.loginForm.setValue(fakeCredentials);
      });
      Then(() => {
        expect(loginServiceSpy.login).not.toHaveBeenCalledWith(fakeCredentials);
      });
    });

    
  });
});
