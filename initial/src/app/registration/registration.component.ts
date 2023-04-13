import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'ld-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup = new FormGroup({
    user: new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    }),
    llama: new FormGroup({
      name: new FormControl('', [Validators.required]),
      imageFileName: new FormControl('', [Validators.required])
    })
  });

  constructor(
    private registrationService: RegistrationService
  ) { }

  ngOnInit(): void {
  }

  createAccount() {
    if (this.registrationForm.valid) {
      const credentials = this.registrationForm.value;
      this.registrationService.registerNewUser(credentials);
    }
  }

  get emailControl() {
    return this.registrationForm.get('user.email');
  }

  get passwordControl() {
    return this.registrationForm.get('user.password');
  }

  get nameControl() {
    return this.registrationForm.get('llama.name');
  }

  get imageFileNameControl() {
    return this.registrationForm.get('llama.imageFileName');
  }

}
