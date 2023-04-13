import { FrontComponent } from './front/front.component';
import { LlamaPageComponent } from './llama-page/llama-page.component';
import { Routes } from '@angular/router';
import { appRoutesNames } from './app.routes.names';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

export const APP_ROUTES: Routes = [
  { path: '', component: FrontComponent },
  { path: `${appRoutesNames.LOGIN}`, component: LoginComponent },
  { path: `${appRoutesNames.REGISTER}`, component: RegistrationComponent },
  { path: `${appRoutesNames.LLAAMA_PAGE}/:id`, component: LlamaPageComponent },
];
