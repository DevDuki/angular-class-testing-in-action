import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Llama } from '../../_types/llama.type';
import { map } from 'rxjs/operators';
import { HttpAdapterService } from '../adapters/http-adapter/http-adapter.service';

export const LLAMAS_REMOTE_PATH = '/api/llamas';

@Injectable({
  providedIn: 'root'
})
export class LlamaRemoteService {
  constructor(
    private http: HttpClient,
    private httpAdapterService: HttpAdapterService,
  ) {

  }

  // TODO: change url to /llamas AND change to Adapter
  getLlamasFromServer(): Observable<Llama[]> {
    return this.http.get<Llama[]>('/api/newestLlamas');
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
