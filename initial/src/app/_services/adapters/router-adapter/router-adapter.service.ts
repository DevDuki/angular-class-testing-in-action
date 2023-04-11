import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class RouterAdapterService {
  constructor(private router: Router) { }

  goToUrl(url: string) {
    this.router.navigateByUrl(url);
  }
}
