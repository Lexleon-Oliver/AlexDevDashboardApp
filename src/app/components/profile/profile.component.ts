import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProfileDropdownComponent } from '../profile-dropdown/profile-dropdown.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ProfileDropdownComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  constructor(
    public authService:AuthService
  ){}

}
