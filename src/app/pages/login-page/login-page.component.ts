import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { ErrorModalComponent } from '../../components/error-modal/error-modal.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ErrorModalComponent,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService:AuthService,
    public requestService: RequestService  ){
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required], // Define os controles do FormGroup
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {
  }

  onSubmit() {
    if (this.loginForm?.valid) {
      const { username, password } = this.loginForm.value;
      const formattedUsername = `@${username}`;
      this.requestService.showLoading();
      this.authService.login(formattedUsername, password).subscribe({
        next: (response) => {
          this.requestService.hideLoading();
          // Navegação ou outras ações pós-login
        },
        error: (error) => {
          this.requestService.trataErro(error);
        }
      });
    }
  }
}


