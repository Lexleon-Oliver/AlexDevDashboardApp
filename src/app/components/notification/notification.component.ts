import { Component } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';
import { NotificationDropdownComponent } from '../notification-dropdown/notification-dropdown.component';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [
    NotificationDropdownComponent,
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {

  constructor(
    public notificationsService: NotificationsService
  ){}

}
