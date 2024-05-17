import { Component } from '@angular/core';
import { NotificationItem } from '../../models/notification-item';
import { NotificationsService } from '../../services/notifications.service';
import { NotificationItemComponent } from '../notification-item/notification-item.component';

@Component({
  selector: 'app-notification-dropdown',
  standalone: true,
  imports: [
    NotificationItemComponent,
  ],
  templateUrl: './notification-dropdown.component.html',
  styleUrl: './notification-dropdown.component.scss'
})
export class NotificationDropdownComponent {

  notificationList!: NotificationItem[];

  constructor(
    public notificationsService: NotificationsService
  ){
    this.notificationList= notificationsService.getNotifications();
  }

}
