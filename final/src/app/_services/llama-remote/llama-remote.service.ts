import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Llama } from '../../_types/llama.type';
import { map } from 'rxjs/operators';
import { HttpAdapterService } from '../adapters/http-adapter/http-adapter.service';
import { QueryConfig } from 'src/app/_types/query-config.type';
import { stringify } from 'query-string';

export const LLAMAS_REMOTE_PATH = '/api/llamas';

@Injectable({
  providedIn: 'root'
})
export class LlamaRemoteService {
  constructor(
    private httpAdapterService: HttpAdapterService,
  ) {

  }

  getMany(queryConfig?: QueryConfig): Observable<Llama[]> {
    let url = LLAMAS_REMOTE_PATH;
    if (queryConfig && queryConfig.filters) {
      const queryParams = stringify(queryConfig.filters);
      url += '?' + queryParams;
    }
    return this.httpAdapterService.get<Llama[]>(url);
  }

  update(llamaId: string, changes: Partial<Llama>): Promise<Llama> {
    const url = `${LLAMAS_REMOTE_PATH}/${llamaId}`;
    return this.httpAdapterService.patch(url, changes);
  }

  create(basicLlamaDetails: Partial<Llama>): Promise<Llama> {
    return this.httpAdapterService.post(LLAMAS_REMOTE_PATH, basicLlamaDetails);
  }

  getByUserId(userId: number): Observable<Llama> {
    const url = LLAMAS_REMOTE_PATH + '?userId=' + userId;
    return this.httpAdapterService.get<Llama[]>(url)
      .pipe(map(results => results[0]));
  }
}
