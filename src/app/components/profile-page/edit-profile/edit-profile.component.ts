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
import { RequestResponse } from '../../../models/request-response';
import { RequestService } from '../../../services/request.service';

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
    private requestService:RequestService
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

  onAdd() {
    if (this.formEditProfile.valid) {
      const updatedUser: Partial<UserLogged> = {
        id: this.authService.getUsuarioLogado()?.id,
        username:this.authService.getUsuarioLogado()?.username,
        jobTitle: this.formEditProfile.value.cargoUsuario,
        city: this.formEditProfile.value.cidadeUsuario,
        company: this.formEditProfile.value.empresaUsuario,
        address: this.formEditProfile.value.enderecoUsuario,
        about: this.formEditProfile.value.sobrePerfil,
        name: this.formEditProfile.value.nomeUsuario,
        email: this.formEditProfile.value.emailUsuario,
        phone: this.formEditProfile.value.telefoneUsuario,
      };

      this.authService.updateUserProfile(updatedUser).subscribe({
        next: (response: RequestResponse) => {
          this.requestService.trataSucesso(response);
          this.location.back();
        },
        error: (error: any) => {
          this.requestService.trataErro(error);
          // Trate o erro, exiba uma mensagem de erro, etc.
        }
      });
    } else {
      console.error('Form is not valid');
      // Opcional: exiba uma mensagem de erro informando que o formulário não é válido
    }
  }

  onCancel() {
    this.location.back();

  }

}
