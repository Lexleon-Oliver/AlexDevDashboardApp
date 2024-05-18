import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { ErrorAlertComponent } from '../../components/error-alert/error-alert.component';
import { ThemesService } from '../../services/themes.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ErrorAlertComponent,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService:AuthService,
    public requestService: RequestService,
    private themeService: ThemesService
  ){
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required], // Define os controles do FormGroup
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {
  }

  onSubmit(){
    if (this.loginForm) {
      const usernameControl = this.loginForm.get('username');
      const passwordControl = this.loginForm.get('password');
      if (usernameControl && passwordControl) {
        if (this.loginForm.valid) {
          const username = "@"+usernameControl.value;
          const password = passwordControl.value;
          this.requestService.showLoading();
          this.authService.login(username, password).subscribe({
            next:  (response) => {
              this.requestService.hideLoading();

              // this.router.navigate(['/application']);
            },

            error: (error) => {
              console.error("Erro no login");
              this.requestService.trataErro(error)

            }
          });
        }
      }
    }
  }
}


