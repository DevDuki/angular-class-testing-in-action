import { getUserIdFromToken } from './get-user-id-from-token';

describe('getUserIdFromToken', () => {
  let expectedResult: any;
  const fakeUserId = 2;
  const accessTokenWithUserIdOf2 =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
    'eyJzdWIiOjIsIm5hbWUiOiJGQUtFIFVTRVIiLCJpYXQiOjE1MTYyMzkwMjJ9.' +
    'R51Wh-iafjESs9CI45tDVlBHEwSaWhwBcZqwH8NVw50';

  When(() => {
    expectedResult = getUserIdFromToken(accessTokenWithUserIdOf2);
  });

  Then(() => {
    expect(expectedResult).toEqual(fakeUserId);
  });
});
