import { Component, OnInit } from '@angular/core';
import { LlamaStateService } from './_services/llama-state/llama-state.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ld-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  userLlamaName$: Observable<string>;

  constructor(private llamaStateService: LlamaStateService) {}

  ngOnInit() {
    this.userLlamaName$ = this.llamaStateService
      .getUserLlama$()
      .pipe(map(llama => (llama ? llama.name : 'Guest')));
  }
}
