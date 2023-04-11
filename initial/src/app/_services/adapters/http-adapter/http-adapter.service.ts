import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpAdapterService {

  constructor() { }

  // TODO: TEST
  patch<T>(url: string, body: T): Promise<Required<T>> {
    throw new Error('Not implemented');
  }
}
