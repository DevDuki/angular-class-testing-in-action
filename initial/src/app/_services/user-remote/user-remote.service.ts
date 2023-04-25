import { Injectable } from '@angular/core';
import { UserCredentials } from '../../_types/user-credentials.type';
import { HttpAdapterService } from '../adapters/http-adapter/http-adapter.service';
import { getUserIdFromToken } from './get-user-id-from-token';

export const USER_REMOTE_PATH = '/api/users';

@Injectable({
  providedIn: 'root'
})
export class UserRemoteService {

  constructor(
    private httpAdapterService: HttpAdapterService
  ) { }

  async create(credentials: UserCredentials): Promise<number> {
    const tokenHolder = await this.httpAdapterService
      .post<{ accessToken: string }>(USER_REMOTE_PATH, credentials);

    return getUserIdFromToken(tokenHolder.accessToken);
  }
}
