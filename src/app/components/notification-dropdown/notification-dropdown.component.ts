import { Component } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';
import { NotificationItemComponent } from '../notification-item/notification-item.component';
import { MyNotification } from '../../models/my-notification';

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

  notificationList!: MyNotification[];

  constructor(
    public notificationsService: NotificationsService
  ){
    this.notificationList= notificationsService.getNotifications();
  }

}
