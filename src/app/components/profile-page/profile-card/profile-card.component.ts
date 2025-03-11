import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent {

  dadosUsuario: any={};

constructor(
  private authService: AuthService
){
  this.dadosUsuario.nome= authService.getFirstAndLastName().toUpperCase();
  this.dadosUsuario.cargo= authService.getJobTitle();
}
}
