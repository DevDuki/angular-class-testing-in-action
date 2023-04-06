import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { LoginService } from './login.service';
import { UserCredentials } from '../_types/user-credentials.type';
import { appRoutesNames } from '../app.routes.names';

@Component({
  selector: 'ld-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registerLink: string = `/${appRoutesNames.REGISTER}`;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(private loginService: LoginService) {}

  ngOnInit() {}

  get emailControl(): AbstractControl {
    return this.loginForm.get('email');
  }

  get passwordControl(): AbstractControl {
    return this.loginForm.get('password');
  }

  handleLogin() {
    if (this.loginForm.valid) {
      const credentials: UserCredentials = this.loginForm.value;
      this.loginService.login(credentials);
    }
  }
}
