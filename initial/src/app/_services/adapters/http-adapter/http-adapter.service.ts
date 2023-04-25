import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpAdapterService {

  constructor(
    private http: HttpClient
  ) { }

  patch<T>(url: string, body: T): Promise<T> {
    return this.http.patch<T>(url, body).toPromise();
  }

  // TODO: TEST
  post<T>(url: string, body: any): Promise<T> {
    throw new Error('Method not implemented.')
  }
}
