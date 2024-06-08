import { Component, OnInit } from '@angular/core';
import { FormComponent } from '../../form/form.component';
import { InputPasswordFormComponent } from '../../input-password-form/input-password-form.component';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ButtonModel } from '../../../models/button-model';
import { AuthService } from '../../../services/auth.service';
import { Location } from '@angular/common';
import { passwordLengthValidator } from '../../../validators/password-length.validator';
import { passwordLowerValidator } from '../../../validators/password-lower.validator';
import { passwordUpperValidator } from '../../../validators/password-upper.validator';
import { passwordCharValidator } from '../../../validators/password-char.validator';
import { passwordNumberValidator } from '../../../validators/password-number.validator';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    FormComponent,
    InputPasswordFormComponent,
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent implements OnInit {
  formChangePassword!: FormGroup;
  formButtons: ButtonModel[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private authService: AuthService,
  ) {
    this.formChangePassword = this.formBuilder.group({
      currentPassword: ['', [ Validators.required, passwordLengthValidator, passwordLowerValidator, passwordUpperValidator, passwordCharValidator, passwordNumberValidator]],
      newPassword: ["", [ Validators.required, passwordLengthValidator, passwordLowerValidator, passwordUpperValidator, passwordCharValidator, passwordNumberValidator]],
      renewPassword: ["", [ Validators.required, passwordLengthValidator, passwordLowerValidator, passwordUpperValidator, passwordCharValidator, passwordNumberValidator]]
    });
    const renewPasswordControl = this.formChangePassword.get('renewPassword');
    if (renewPasswordControl) {
      renewPasswordControl.setValidators([
        Validators.required,
        this.matchingPasswords(this.formChangePassword)
      ]);
    }
    this.formButtons.push(
      new ButtonModel('', 'bi bi-arrow-return-left', 'default', 'secondary', 'small', false, false, this.onCancel.bind(this)),
      new ButtonModel('', 'bi bi-floppy', 'default', 'success', 'small', false, true, this.onAdd.bind(this),this.formChangePassword),
    );
  }

  ngOnInit() {

  }

  onAdd(){

  }

  matchingPasswords(form: FormGroup): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const newPassword = form.get('newPassword')?.value;
      const renewPassword = control.value;

      return newPassword === renewPassword ? null : { notEquals: true };
    };
  }

  onCancel() {
    this.location.back();

  }

  resetForm() {
    this.formChangePassword.reset();
    this.formChangePassword.get('currentPassword')?.setValue('')
    this.formChangePassword.get('newPassword')?.setValue('')
    this.formChangePassword.get('renewPassword')?.setValue('')
  }
}
