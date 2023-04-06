import { TestBed, fakeAsync } from '@angular/core/testing';
import { Spy, createSpyFromClass } from 'jasmine-auto-spies';
import { UserRemoteService, USER_REMOTE_PATH } from './user-remote.service';
import { UserCredentials } from 'src/app/_types/user-credentials.type';
import { HttpAdapterService } from '../adapters/http-adapter/http-adapter.service';
import * as jwtDecoder from './get-user-id-from-token';
import { API_BASE_URL } from '../api-base-url';

describe('UserRemoteService', () => {
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
    httpAdapterServiceSpy = TestBed.inject<any>(HttpAdapterService);

    actualResult = undefined;
  });

  describe('METHOD: create', () => {
    let fakeCredentials: UserCredentials;

    const accessTokenWithUserIdOf2 =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJzdWIiOjIsIm5hbWUiOiJGQUtFIFVTRVIiLCJpYXQiOjE1MTYyMzkwMjJ9.' +
      'R51Wh-iafjESs9CI45tDVlBHEwSaWhwBcZqwH8NVw50';

    const expectedUserId = 2;

    When(
      fakeAsync(async () => {
        actualResult = await serviceUnderTest.create(fakeCredentials);
      })
    );

    describe('GIVEN user created successfully THEN return user id', () => {
      Given(() => {
        fakeCredentials = {
          email: 'fake@fake.com',
          password: 'FAKE PASSWORD'
        };

        const expectedUrl = USER_REMOTE_PATH;

        httpAdapterServiceSpy.post
          .mustBeCalledWith(expectedUrl, fakeCredentials)
          .resolveWith({
            accessToken: accessTokenWithUserIdOf2
          });

        spyOn(jwtDecoder, 'getUserIdFromToken')
          .withArgs(accessTokenWithUserIdOf2)
          .and.returnValue(expectedUserId);
      });
      Then(() => {
        expect(actualResult).toEqual(expectedUserId);
      });
    });
  });

  describe('METHOD: authenticate', () => {
    let fakeCredentials: UserCredentials;

    Given(() => {
      fakeCredentials = undefined;
    });

    When(
      fakeAsync(async () => {
        actualResult = await serviceUnderTest.authenticate(fakeCredentials);
      })
    );

    describe('GIVEN user logged in successfully THEN return user id', () => {
      const expectedUserId = 2;

      const accessTokenWithUserIdOf2 =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
        '.eyJzdWIiOjIsIm5hbWUiOiJGQUtFIFVTRVIiLCJpYXQiOjE1MTYyMzkwMjJ9.' +
        'R51Wh-iafjESs9CI45tDVlBHEwSaWhwBcZqwH8NVw50';

      Given(() => {
        fakeCredentials = {
          email: 'FAKE EMAIL',
          password: 'FAKE PASSWORD'
        };

        const expectedUrl = API_BASE_URL + '/login';

        spyOn(jwtDecoder, 'getUserIdFromToken')
          .withArgs(accessTokenWithUserIdOf2)
          .and.returnValue(expectedUserId);

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
