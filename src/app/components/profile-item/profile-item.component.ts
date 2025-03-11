import { Component, Input } from '@angular/core';
import { ProfileMenuItem } from '../../models/profile-menu-item';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile-item',
  standalone: true,
  imports: [],
  templateUrl: './profile-item.component.html',
  styleUrl: './profile-item.component.scss'
})
export class ProfileItemComponent {

  @Input() menu!:ProfileMenuItem


  constructor(
    private router: Router,
    private authService: AuthService
  ){}

  redirect() {
    if(this.menu.url!=="/logout"){
      this.router.navigate([this.menu.url])
    }else{
      this.authService.logout();
    }
  }
}
