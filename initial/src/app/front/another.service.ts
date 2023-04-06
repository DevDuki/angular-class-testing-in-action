import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Llama } from './llama.model';

@Injectable()
export class AnotherService {
  constructor(private http: HttpClient) {

  }

  getLlamasFromServer(): Observable<Llama[]> {
    return this.http.get<Llama[]>('/api/newestLlamas');
  }
}
