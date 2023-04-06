import { Injectable } from '@angular/core';
import { UserCredentials } from 'src/app/_types/user-credentials.type';
import { HttpAdapterService } from '../adapters/http-adapter/http-adapter.service';
import { getUserIdFromToken } from './get-user-id-from-token';
import { API_BASE_URL } from '../api-base-url';

export const USER_REMOTE_PATH = '/api/users';

@Injectable({
  providedIn: 'root'
})
export class UserRemoteService {
  constructor(private httpAdapterService: HttpAdapterService) {}

  create(credentials: UserCredentials): Promise<number> {
    return this.httpAdapterService
      .post<{ accessToken: string }>(USER_REMOTE_PATH, credentials)
      .then(({ accessToken }) => getUserIdFromToken(accessToken));
  }

  authenticate(credentials: UserCredentials): Promise<number> {
    return this.httpAdapterService
      .post<{ accessToken: string }>(API_BASE_URL + '/login', credentials)
      .then(({ accessToken }) => getUserIdFromToken(accessToken));
  }
}
