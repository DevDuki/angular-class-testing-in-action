import { GlobalErrorHandlerService } from './global-error-handler.service';
import { TestBed } from '@angular/core/testing';
import { AppError } from 'src/app/_types/app-error';
import { take } from 'rxjs/operators';

describe('GlobalErrorHandlerService', () => {
  let serviceUnderTest: GlobalErrorHandlerService;

  let actualResult: any;

  Given(() => {
    TestBed.configureTestingModule({
      providers: [GlobalErrorHandlerService]
    });

    serviceUnderTest = TestBed.inject(GlobalErrorHandlerService);

    actualResult = undefined;
  });

  describe('METHOD: handleError', () => {
    let fakeError: AppError;

    When(() => {
      serviceUnderTest.handleError(fakeError);
    });

    describe('GIVEN error THEN next it', () => {
      Given(() => {
        fakeError = {
          text: 'OMG THIS IS AN ERROR!!!'
        };
        serviceUnderTest
          .getErrors$()
          .pipe(take(1))
          .subscribe(error => (actualResult = error));
      });
      Then(() => {
        expect(actualResult).toEqual(fakeError);
      });
    });
  });
});
