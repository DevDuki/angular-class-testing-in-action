import { Routes } from '@angular/router';
import { FrontComponent } from './front/front.component';
import { LlamaPageComponent } from './llama-page/llama-page.component';
import { appRoutesNames } from './app.routes.names';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

export const APP_ROUTES: Routes = [
  { path: '', component: FrontComponent },
  { path: `${appRoutesNames.LLAMA_PAGE}/:id`, component: LlamaPageComponent },
  { path: `${appRoutesNames.LOGIN}`, component: LoginComponent },
  { path: appRoutesNames.REGISTER, component: RegistrationComponent }
];
