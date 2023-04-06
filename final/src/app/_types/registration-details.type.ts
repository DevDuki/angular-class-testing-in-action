import { Llama } from './llama.type';
import { UserCredentials } from './user-credentials.type';

export interface RegistrationDetails {
  user: UserCredentials;
  llama: Partial<Llama>;
}
