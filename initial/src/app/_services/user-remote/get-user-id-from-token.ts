export const getUserIdFromToken = (token: string): number => {
  const tokenPayload = token.split('.')[1];
  const decodedTokenPayload = atob(tokenPayload);
  const tokenPayloadAsObject = JSON.parse(decodedTokenPayload);

  return tokenPayloadAsObject.sub;
}
