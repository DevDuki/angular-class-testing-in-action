import { UserCredentials } from './user-credentials.type';
import { Llama } from './llama.type';

export interface RegistrationDetails {
  user: UserCredentials,
  llama: Partial<Llama>
}
