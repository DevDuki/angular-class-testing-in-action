export function getUserIdFromToken(token: string): number {
  const payload = JSON.parse(atob(token.split('.')[1]));
  const userId = Number(payload.sub);
  
  return userId;
}
