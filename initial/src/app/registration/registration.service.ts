import { Injectable } from '@angular/core';
import { RegistrationDetails } from '../_types/registration-details.type';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor() { }

  // TODO: TEST
  registerNewUser({ user, llama }: RegistrationDetails) {
    throw new Error('Not implemented');
  }
}
