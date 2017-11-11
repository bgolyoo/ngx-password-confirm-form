import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { passwordValidator, PasswordValidatorOptions } from './password-validator.directive';
import { matchOtherValidator } from './match-other-validator.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public passwordForm: FormGroup;
  public defaultTextInputMinLength = 3;
  public defaultTextInputMaxLength = 10;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initPasswordForm();
  }

  public submit(): void {
    console.log(this.passwordForm.value);
  }

  private initPasswordForm(): void {
    this.passwordForm = this.formBuilder.group({
      passwords: this.formBuilder.group({
        password: ['', [
          Validators.required,
          passwordValidator({ minLength: this.defaultTextInputMinLength, maxLength: this.defaultTextInputMaxLength })
        ]],
        confirmPassword: ['', [
          Validators.required,
          passwordValidator({ minLength: this.defaultTextInputMinLength, maxLength: this.defaultTextInputMaxLength }),
          matchOtherValidator('password')
        ]]
      })
    });
  }

}
