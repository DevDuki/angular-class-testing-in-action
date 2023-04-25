import { Injectable } from '@angular/core';
import { UserCredentials } from '../../_types/user-credentials.type';

@Injectable({
  providedIn: 'root'
})
export class UserRemoteService {

  constructor() { }

  // TODO: TEST
  create(user: UserCredentials): Promise<number> {
    throw new Error('Not implemented');
  }
}
