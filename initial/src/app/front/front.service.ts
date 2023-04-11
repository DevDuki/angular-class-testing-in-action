import { Injectable } from '@angular/core';
import { Llama } from '../_types/llama.type';
import { LlamaRemoteService } from '../_services/llama-remote/llama-remote.service';
import { RouterAdapterService } from '../_services/adapters/router-adapter/router-adapter.service';
import { appRoutesNames } from '../app.routes.names';

@Injectable({
  providedIn: 'root'
})
export class FrontService {

  userLlama: Llama;

  constructor(
    private llamaRemoteService: LlamaRemoteService,
    private routerAdapterService: RouterAdapterService
  ) {}

  getFeaturedLlamas(config?: any): Promise<Llama[]> {
    return this.llamaRemoteService.getLlamasFromServer().toPromise();
  }

  pokeLlama(llama: Llama) {
    if (!this.userLlama) {
      this.routerAdapterService.goToUrl(`/${appRoutesNames.LOGIN}`);
      return;
    }

    const userLlamaId = this.userLlama.id;

    const clonedPokedBy = llama.pokedByTheseLlamas
      ? [...llama.pokedByTheseLlamas]
      : [];
    clonedPokedBy.push(userLlamaId);

    this.llamaRemoteService.update(llama.id, {
      pokedByTheseLlamas: clonedPokedBy
    });
  }
}
