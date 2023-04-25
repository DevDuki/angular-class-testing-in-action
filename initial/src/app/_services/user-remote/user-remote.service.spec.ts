import { TestBed } from '@angular/core/testing';

import { UserRemoteService } from './user-remote.service';
import { UserCredentials } from '../../_types/user-credentials.type';
import { HttpAdapterService } from '../adapters/http-adapter/http-adapter.service';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';

fdescribe('UserRemoteService', () => {
  let serviceUnderTest: UserRemoteService;

  let httpAdapterServiceSpy: Spy<HttpAdapterService>;

  let actualResult: any;

  Given(() => {
    TestBed.configureTestingModule({
      providers: [
        UserRemoteService,
        { provide: HttpAdapterService, useValue: createSpyFromClass(HttpAdapterService) }
      ]
    });

    serviceUnderTest = TestBed.inject(UserRemoteService);

    httpAdapterServiceSpy = TestBed.inject(HttpAdapterService) as Spy<HttpAdapterService>;
  });

  describe('METHOD: create', () => {
    let fakeCredentials: UserCredentials;

    const expectedUserId = 2;
    const accessTokenWithUserIdOf2 =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJzdWIiOjIsIm5hbWUiOiJGQUtFIFVTRVIiLCJpYXQiOjE1MTYyMzkwMjJ9.' +
      'R51Wh-iafjESs9CI45tDVlBHEwSaWhwBcZqwH8NVw50';

    When(async () => {
      actualResult = await serviceUnderTest.create(fakeCredentials);
    });

    describe(`GIVEN user created successfully THEN return user id`, () => {
      Given(() => {
        fakeCredentials = {
          email: 'fake@email.com',
          password: 'FAKE PASSWORD'
        };

        const expectedUrl = '/api/users';

        httpAdapterServiceSpy.post
          .mustBeCalledWith(expectedUrl, fakeCredentials)
          .resolveWith({
            accessToken: accessTokenWithUserIdOf2
          });
      });

      Then(() => {
        expect(actualResult).toEqual(expectedUserId);
      });
    });
  });
});
