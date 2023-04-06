import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { AppError } from 'src/app/_types/app-error';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService {

  private errorsSubject: ReplaySubject<AppError> = new ReplaySubject(1);

  constructor() {}

  handleError(error: AppError): void {
    this.errorsSubject.next(error);
  }

  getErrors$(): Observable<AppError> {
    return this.errorsSubject.asObservable();
  }
}
