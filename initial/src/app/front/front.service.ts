import { Injectable } from '@angular/core';
import { Llama } from '../_types/llama.type';
import { LlamaRemoteService } from '../_services/llama-remote/llama-remote.service';

@Injectable({
  providedIn: 'root'
})
export class FrontService {

  userLlama: Llama;

  constructor(private llamaRemoteService: LlamaRemoteService) {}

  getFeaturedLlamas(config?: any): Promise<Llama[]> {
    return this.llamaRemoteService.getLlamasFromServer().toPromise();
  }

  pokeLlama(llama: Llama) {
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
