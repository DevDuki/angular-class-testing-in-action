import { AppNotificationsComponent } from './app-notifications.component';
import { TestBed } from '@angular/core/testing';
import { Spy, createSpyFromClass } from 'jasmine-auto-spies';
import { GlobalErrorHandlerService } from '../_services/global-error-handler/global-error-handler.service';
import { AppError } from '../_types/app-error';

describe('AppNotificationsComponent', () => {
  let componentUnderTest: AppNotificationsComponent;

  let globalErrorHandlerServiceSpy: Spy<GlobalErrorHandlerService>;

  Given(() => {
    TestBed.configureTestingModule({
      providers: [
        AppNotificationsComponent,
        {
          provide: GlobalErrorHandlerService,
          useValue: createSpyFromClass(GlobalErrorHandlerService)
        }
      ]
    });

    componentUnderTest = TestBed.inject(AppNotificationsComponent);

    globalErrorHandlerServiceSpy = TestBed.inject<any>(GlobalErrorHandlerService);
  });

  describe('INIT', () => {
    When(() => {
      componentUnderTest.ngOnInit();
    });

    describe('WHEN 2 errors have been emitted THEN push them to the errors list', () => {
      Given(() => {
        globalErrorHandlerServiceSpy.getErrors$.and.returnSubject();
      });

      When(() => {
        globalErrorHandlerServiceSpy.getErrors$.and.nextWith({
          text: 'FAKE ERROR 1'
        });
        globalErrorHandlerServiceSpy.getErrors$.and.nextOneTimeWith({
          text: 'FAKE ERROR 2'
        });
      });

      Then(() => {
        expect(componentUnderTest.errorMessages).toEqual([
          'FAKE ERROR 1',
          'FAKE ERROR 2'
        ]);
      });
    });
  });

  describe('METHOD: removeError', () => {
    let fakeErrorMessage: string;
    When(() => {
      componentUnderTest.removeError(fakeErrorMessage);
    });

    describe('GIVEN errorMessages contain a message THEN remove it from the list', () => {
      Given(() => {
        fakeErrorMessage = 'FAKE ERROR';
        componentUnderTest.errorMessages = [fakeErrorMessage];
      });

      Then(() => {
        expect(componentUnderTest.errorMessages).toEqual([]);
      });
      
    });

    describe('GIVEN errorMessages does not contain a message THEN do nothing', () => {
      Given(() => {
        fakeErrorMessage = 'FAKE ERROR';
        componentUnderTest.errorMessages = [];
      });

      Then(() => {
        expect(componentUnderTest.errorMessages).toEqual([]);
      });
      
    });
    
  });
});
