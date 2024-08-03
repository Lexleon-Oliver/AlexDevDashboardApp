import { Component } from '@angular/core';
import { PageLayoutComponent } from '../../components/page-layout/page-layout.component';
import { FormComponent } from '../../components/form/form.component';
import { InputFormComponent } from '../../components/input-form/input-form.component';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ButtonModel } from '../../models/button-model';
import { RequestService } from '../../services/request.service';
import { Location } from '@angular/common';
import { SimpleCardComponent } from '../../components/simple-card/simple-card.component';
import { Register } from '../../models/register';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    PageLayoutComponent,
    SimpleCardComponent,
    FormComponent,
    InputFormComponent
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  formUser!: FormGroup;
  formButtons: ButtonModel[] = [];
  permissions: string[]=[];

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private location: Location,
    private requestService: RequestService,
    private authService: AuthService,
  ) {
    this.formUser = this.formBuilder.group({
      username: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ]
      ],
      cargo: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ]
      ],
      nome: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)
        ]
      ],
      email: ['',
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(50)
        ]
      ],
    });
    this.formButtons.push(
      new ButtonModel('', 'bi bi-arrow-return-left', 'default', 'secondary', 'small', false, false, this.onCancel.bind(this)),
      new ButtonModel('', 'bi bi-floppy', 'default', 'success', 'small', false, true, this.onAdd.bind(this),this.formUser),
    );
  }

  ngOnInit() {
  }

  onCancel() {
    this.location.back();

  }

  onAdd() {
    this.requestService.showLoading();
    const formData = this.formUser.value;

    const newRegister: Register = {
      username: formData.username,
      email: formData.email,
      name: formData.nome,
      jobTitle: formData.cargo,
      roles:[""]
    };


    this.authService.register(newRegister).subscribe({
      next: (response) => {
        this.requestService.trataSucesso(response);
        setTimeout(() => {
          this.onCancel();
        }, 3000);
      },
      error: (error) => {
        this.requestService.trataErro(error);
      }
    });

  }

  onPermissionsSelected(permissions: string[]) {
    this.permissions =permissions
  }
}
