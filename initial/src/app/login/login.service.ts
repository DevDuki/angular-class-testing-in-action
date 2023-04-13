import { Injectable } from '@angular/core';
import { UserCredentials } from '../_types/user-credentials.type';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  // TODO: TEST
  login(credentials: UserCredentials) {
    throw new Error('Not implemented');
  }
}
