import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { TemplateComponent } from './components/template/template.component';
import { ThemeItem } from './models/theme-item';
import { ThemesService } from './services/themes.service';

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

  defaultTheme!: ThemeItem;

  constructor(
    public authService: AuthService,
  ){
  }


}
