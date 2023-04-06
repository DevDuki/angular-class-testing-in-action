import { AppComponent } from './app.component';
import { TestBed } from '@angular/core/testing';

describe('METHOD: getWelcomingMessage', () => {

  let actualValue: any;
  let expectedValue: any;
  let fakeUserName: string;
  let componentUnderTest: AppComponent;

  Given(() => {

    TestBed.configureTestingModule({
      providers: [
        AppComponent
      ]
    });

    componentUnderTest = TestBed.get(AppComponent);
  });

  When(() => {
    actualValue = componentUnderTest.getWelcomingMessage(fakeUserName); 
  });

  describe('user name is Bonnie', () => {

    Given(() => {
      componentUnderTest.greeting = 'Hola';
      fakeUserName = 'Bonnie';
    });
    Then(() => {
      expectedValue = 'Hola Bonnie';
      expect(actualValue).toEqual(expectedValue);
    });
  });

  describe('user name is Alyssa', () => {

    Given(() => {
      fakeUserName = 'Alyssa'; 
    });
    Then(() => {
      expectedValue = 'Hello Alyssa';
      expect(actualValue).toEqual(expectedValue);
    });
  });
});