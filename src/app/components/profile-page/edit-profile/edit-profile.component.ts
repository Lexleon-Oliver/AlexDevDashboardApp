import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserLogged } from '../../../models/user-logged';
import { AuthService } from '../../../services/auth.service';
import { Location } from '@angular/common';
import { ButtonModel } from '../../../models/button-model';
import { FormComponent } from '../../form/form.component';
import { InputFormComponent } from '../../input-form/input-form.component';
import { InputPhoneFormComponent } from '../../input-phone-form/input-phone-form.component';
import { TextAreaFormComponent } from '../../text-area-form/text-area-form.component';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    FormComponent,
    InputFormComponent,
    InputPhoneFormComponent,
    TextAreaFormComponent,

  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent {

  formEditProfile!: FormGroup;
  formButtons: ButtonModel[] = [];
  usuario?: UserLogged;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private location: Location,
  ){
    this.usuario=authService.getUsuarioLogado()
    if(this.usuario){
      this.formEditProfile = this.formBuilder.group({
        cargoUsuario: [this.usuario.jobTitle, [Validators.required, Validators.maxLength(30), Validators.minLength(3)]],
        cidadeUsuario: [this.usuario.city, [Validators.maxLength(30)]],
        empresaUsuario: [this.usuario.company,[Validators.maxLength(30)]],
        enderecoUsuario: [this.usuario.address, [Validators.maxLength(100)]],
        sobrePerfil: [this.usuario.about, [Validators.maxLength(1000)]],
        nomeUsuario: [this.usuario.name, [Validators.required, Validators.maxLength(100), Validators.minLength(3)]],
        emailUsuario: [this.usuario.email, [Validators.required, Validators.email, Validators.maxLength(30)]],
        telefoneUsuario: [this.usuario.phone],
      });

    }
    this.formButtons.push(
      new ButtonModel('', 'bi bi-arrow-return-left', 'default', 'secondary', 'small', false, false, this.onCancel.bind(this)),
      new ButtonModel('', 'bi bi-floppy', 'default', 'success', 'small', false, true, this.onAdd.bind(this),this.formEditProfile),
    );
  }

  onAdd(){

  }

  onCancel() {
    this.location.back();

  }

}
