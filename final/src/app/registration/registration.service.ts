import { Injectable } from '@angular/core';
import { RegistrationDetails } from '../_types/registration-details.type';
import { RouterAdapterService } from '../_services/adapters/router-adapter/router-adapter.service';
import { UserRemoteService } from '../_services/user-remote/user-remote.service';
import { LlamaRemoteService } from '../_services/llama-remote/llama-remote.service';
import { appRoutesNames } from '../app.routes.names';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(
    private routerAdapterService: RouterAdapterService,
    private userRemoteService: UserRemoteService,
    private llamaRemoteService: LlamaRemoteService,
  ) { }

  // TODO: Handle errors
  async registerNewUser({user, llama}: RegistrationDetails) {
    const userId = await this.userRemoteService.create(user);

    const llamaWithUserId = {
      ...llama,
      userId
    };

    await this.llamaRemoteService.create(llamaWithUserId);

    this.routerAdapterService.goToUrl(`/${appRoutesNames.LOGIN}`);
  }
}
