import { Component, Input } from '@angular/core';
import { ProfileMenuItem } from '../../models/profile-menu-item';

@Component({
  selector: 'app-profile-item',
  standalone: true,
  imports: [],
  templateUrl: './profile-item.component.html',
  styleUrl: './profile-item.component.scss'
})
export class ProfileItemComponent {

  @Input() menu!:ProfileMenuItem
}
