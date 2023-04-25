import { Injectable } from '@angular/core';
import { UserCredentials } from '../../_types/user-credentials.type';
import { HttpAdapterService } from '../adapters/http-adapter/http-adapter.service';

export const USER_REMOTE_PATH = '/api/users';

@Injectable({
  providedIn: 'root'
})
export class UserRemoteService {

  constructor(
    private httpAdapterService: HttpAdapterService
  ) { }

  // TODO: TEST
  async create(credentials: UserCredentials): Promise<number> {
    const tokenHolder = await this.httpAdapterService
      .post<{ accessToken: string }>(USER_REMOTE_PATH, credentials);

    return this.getUserIdFromToken(tokenHolder.accessToken);
  }

  private getUserIdFromToken(token: string): number {
    const tokenPayload = token.split('.')[1];
    const decodedTokenPayload = atob(tokenPayload);
    const tokenPayloadAsObject = JSON.parse(decodedTokenPayload);

    return tokenPayloadAsObject.sub;
  }
}
