import { Component } from '@angular/core';
import { ProfileItemComponent } from '../profile-item/profile-item.component';
import { AuthService } from '../../services/auth.service';
import { ProfileMenuItem } from '../../models/profile-menu-item';

@Component({
  selector: 'app-profile-dropdown',
  standalone: true,
  imports: [
    ProfileItemComponent,
  ],
  templateUrl: './profile-dropdown.component.html',
  styleUrl: './profile-dropdown.component.scss'
})
export class ProfileDropdownComponent {
  ProfileMenuList!: ProfileMenuItem[];

  constructor(
    public authService:AuthService,
  ){
    this.ProfileMenuList = [
      {
        icon:"bi bi-person",
        label:"Perfil",
        url: "/users/profile"
      },
      {
        icon: 'bi bi-bell',
        label: 'Minhas notificações',
        url: '/users/notifications'
      },
      {
        icon: 'bi bi-list-task',
        label: 'Minhas tarefas',
        url: '/users/tasks'
      },
      {
        icon:"bi bi-box-arrow-right",
        label:"Sair",
        url: "/logout"
      },
    ];
  }

}
