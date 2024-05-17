import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { TemplateComponent } from './components/template/template.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    LoginPageComponent,
    TemplateComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'AlexDevDashApp';

  constructor(
    public authService: AuthService
  ){}

  logout() {
    this.authService.logout();
  }
}
