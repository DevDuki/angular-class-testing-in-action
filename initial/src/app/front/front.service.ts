import { Injectable } from '@angular/core';
import { Llama } from './llama.model';
import { AnotherService } from './another.service';

@Injectable({
  providedIn: 'root'
})
export class FrontService {
  constructor(private anotherService: AnotherService) {}

  getFeaturedLlamas(config?: any): Promise<Llama[]> {

    return this.anotherService.getLlamasFromServer().toPromise();
  }
}
