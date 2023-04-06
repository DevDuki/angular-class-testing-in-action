import { Injectable } from '@angular/core';
import { UserCredentials } from '../_types/user-credentials.type';
import { UserRemoteService } from '../_services/user-remote/user-remote.service';
import { LlamaStateService } from '../_services/llama-state/llama-state.service';
import { RouterAdapterService } from '../_services/adapters/router-adapter/router-adapter.service';
import { GlobalErrorHandlerService } from '../_services/global-error-handler/global-error-handler.service';

export const ERROR_IN_LOGIN_MESSAGE = 'There was an error logging in';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private userRemoteService: UserRemoteService,
    private llamaStateService: LlamaStateService,
    private routerAdapterService: RouterAdapterService,
    private globalErrorHandlerService: GlobalErrorHandlerService,
  ) {}

  async login(credentials: UserCredentials) {
    try {
      const userId = await this.userRemoteService.authenticate(credentials);
      await this.llamaStateService.loadUserLlama(userId);

      this.routerAdapterService.goToUrl('/');
    } catch (error) {

      this.globalErrorHandlerService.handleError({
        text: ERROR_IN_LOGIN_MESSAGE,
        originalError: error
      });
    }
  }
}
