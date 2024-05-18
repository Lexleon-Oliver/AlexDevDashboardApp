import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit{

  constructor(
    public authService: AuthService,
  ){
  }
  ngOnInit(): void {
    if(this.authService.isAuthenticatedUser()){
      this.authService.executeAfterReload();
    }
  }


}
