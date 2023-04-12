import { HttpAdapterService } from './http-adapter.service';
import { TestBed } from '@angular/core/testing';
import serverMock from 'xhr-mock';
import { HttpClientModule } from '@angular/common/http';

describe('HttpAdapterService', () => {
  let serviceUnderTest: HttpAdapterService;
  let actualResult: any;

  Given(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [ HttpAdapterService ]
    });

    serviceUnderTest = TestBed.inject(HttpAdapterService);

    serverMock.setup();
  });

  afterEach(() => {
    serverMock.teardown();
  });

  describe('METHOD: patch', () => {
    let fakeUrlArg: string;
    let fakeBodyArg: any;

    let actualBodySent: any;

    let expectedReturnedResult: any;

    Given(() => {
      fakeUrlArg = '/fake';
      fakeBodyArg = {
        fake: 'body'
      };

      expectedReturnedResult = {
        fake: 'result'
      };

      serverMock.patch(fakeUrlArg, (req, res) => {
        actualBodySent = JSON.parse(req.body());
        return res.status(200).body(JSON.stringify(expectedReturnedResult));
      });
    });

    When(async () => {
      actualResult = await serviceUnderTest.patch(fakeUrlArg, fakeBodyArg);
    });

    Then(() => {
      expect(actualResult).toEqual(expectedReturnedResult);
    });

  });
});
