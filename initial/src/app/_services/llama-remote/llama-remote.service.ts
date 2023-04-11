import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Llama } from '../../_types/llama.type';
import { HttpAdapterService } from '../adapters/http-adapter/http-adapter.service';

export const LLAMAS_REMOTE_PATH = '/api/llamas';

@Injectable({
  providedIn: 'root'
})
export class LlamaRemoteService {

  constructor(
    private http: HttpClient,
    private httpAdapterService: HttpAdapterService
  ) { }

  // TODO: Change url to /llamas and change http to adapter
  getLlamasFromServer(): Observable<Llama[]> {
    return this.http.get<Llama[]>('/api/newestLlamas');
  }

  update(llamaId: string, changes: Partial<Llama>) {
    const url = `${LLAMAS_REMOTE_PATH}/${llamaId}`;
    return this.httpAdapterService.patch(url , changes);
  }
}
