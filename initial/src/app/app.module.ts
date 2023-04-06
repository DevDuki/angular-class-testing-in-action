import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FrontComponent } from './front/front.component';
import { HttpClientModule } from '@angular/common/http';
import { AnotherService } from './front/another.service';
import { RouterModule } from '@angular/router';
import { LlamaPageComponent } from './llama-page/llama-page.component';
import { APP_ROUTES } from './app.routes';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  declarations: [
    AppComponent,
    FrontComponent,
    LlamaPageComponent
  ],
  providers: [
    AnotherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
