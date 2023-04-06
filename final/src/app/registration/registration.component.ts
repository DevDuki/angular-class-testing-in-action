import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'ld-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
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
    private registrationService: RegistrationService,
  ) { }

  ngOnInit() {
  }

  get emailControl(): AbstractControl {
    return this.registrationForm.get('user.email');
  }

  get passwordControl(): AbstractControl {
    return this.registrationForm.get('user.password');
  }

  get nameControl(): AbstractControl {
    return this.registrationForm.get('llama.name');
  }

  get imageFileNameControl(): AbstractControl {
    return this.registrationForm.get('llama.imageFileName');
  }

  createAccount() {
    if (this.registrationForm.valid) {
      this.registrationService.registerNewUser(this.registrationForm.value);
    }
  }
}
