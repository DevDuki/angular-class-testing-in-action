import { TestBed, fakeAsync } from '@angular/core/testing';
import { RegistrationComponent } from './registration.component';
import { Spy, createSpyFromClass } from 'jasmine-auto-spies';
import { RegistrationDetails } from '../_types/registration-details.type';
import { RegistrationService } from './registration.service';

describe('RegistrationComponent', () => {
  let componentUnderTest: RegistrationComponent;
  let registrationServiceSpy: Spy<RegistrationService>;

  let fakeValue: string;

  Given(() => {
    TestBed.configureTestingModule({
      providers: [
        RegistrationComponent,
        { provide: RegistrationService, useValue: createSpyFromClass(RegistrationService) }
      ]
    });

    componentUnderTest = TestBed.inject(RegistrationComponent);

    registrationServiceSpy = TestBed.inject<any>(RegistrationService);

    fakeValue = undefined;
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

    describe('GIVEN email is not an email address THEN email validation should fail', () => {
      Given(() => {
        fakeValue = 'FAKE VALUE';
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

    describe('GIVEN password is not minimum of 8 chars THEN password validation should fail', () => {
      Given(() => {
        fakeValue = '1234567';
      });
      Then(() => {
        expect(componentUnderTest.passwordControl.valid).toBeFalsy();
      });
    });
  });

  describe('EVENT: name changed', () => {
    When(() => {
      componentUnderTest.nameControl.setValue(fakeValue);
    });

    describe('GIVEN name is empty THEN name validation should fail', () => {
      Given(() => {
        fakeValue = '';
      });
      Then(() => {
        expect(componentUnderTest.nameControl.valid).toBeFalsy();
      });
    });

  });

  describe('EVENT: image filename changed', () => {

    When(() => {
      componentUnderTest.imageFileNameControl.setValue(fakeValue);
    });

    describe('GIVEN image filename is empty THEN validation should fail', () => {
      Given(() => {
        fakeValue = '';
      });
      Then(() => {
        expect(componentUnderTest.imageFileNameControl.valid).toBeFalsy();
      });
    });

  });

  describe('METHOD: createAccount', () => {
    let fakeRegistrationDetails: RegistrationDetails;
    Given(() => {
      fakeRegistrationDetails = undefined;
    });

    When(fakeAsync(() => {
      componentUnderTest.createAccount();
    }));

    describe('GIVEN form is valid THEN send registration request', () => {
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

        componentUnderTest.registrationForm.setValue(fakeRegistrationDetails);
      });
      Then(() => {
        expect(registrationServiceSpy.registerNewUser).toHaveBeenCalledWith(
          fakeRegistrationDetails
        );
      });
    });

    describe('GIVEN from is invalid THEN do not send registration request', () => {
      Given(() => {
        fakeRegistrationDetails = {
          user: {
            email: '',
            password: ''
          },
          llama: {
            name: '',
            imageFileName: ''
          }
        };
        componentUnderTest.registrationForm.setValue(fakeRegistrationDetails);
      });

      Then(() => {
        expect(registrationServiceSpy.registerNewUser).not.toHaveBeenCalled();
      });
    });
  });

});
