import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FrontComponent } from './front/front.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LlamaPageComponent } from './llama-page/llama-page.component';
import { APP_ROUTES } from './app.routes';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AppNotificationsComponent } from './app-notifications/app-notifications.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbToastModule,
    ReactiveFormsModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  declarations: [
    AppComponent,
    FrontComponent,
    LlamaPageComponent,
    LoginComponent,
    RegistrationComponent,
    AppNotificationsComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
