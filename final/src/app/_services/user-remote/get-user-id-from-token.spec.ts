import { getUserIdFromToken } from './get-user-id-from-token';

describe('getUserIdFromToken', () => {
  let actualResult: any;

  let tokenArg: string;

  const expectedUserId = 2;

  Given(() => {
    tokenArg = undefined;
  });

  When(() => {
    actualResult = getUserIdFromToken(tokenArg);
  });

  describe('GIVEN token with user id of type number THEN extract user id as number', () => {
    const accessTokenWithUserIdOf2 =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJzdWIiOjIsIm5hbWUiOiJGQUtFIFVTRVIiLCJpYXQiOjE1MTYyMzkwMjJ9.' +
      'R51Wh-iafjESs9CI45tDVlBHEwSaWhwBcZqwH8NVw50';

    Given(() => {
      tokenArg = accessTokenWithUserIdOf2;
    });

    Then(() => {
      expect(actualResult).toEqual(expectedUserId);
    });
  });

  describe('GIVEN token with user id of type string', () => {
    const accessTokenWithUserIdOf2AsString =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJzdWIiOiIyIiwibmFtZSI6IkZBS0UgVVNFUiIsImlhdCI6MTUxNjIzOTAyMn0.' +
      'edOqf3i8atmuLIeDz-Lr3aOoODpMkuQ69McN3BldsQE';

    Given(() => {
      tokenArg = accessTokenWithUserIdOf2AsString;
    });

    Then(() => {
      expect(actualResult).toEqual(expectedUserId);
    });
  });
});
