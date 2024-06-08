import { Component } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';
import { NotificationItemComponent } from '../notification-item/notification-item.component';
import { MyNotification } from '../../models/my-notification';
import { Router } from '@angular/router';

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
    public notificationsService: NotificationsService,
    private router: Router
  ){
    this.notificationList= notificationsService.getNotifications();
  }

  viewAllNotifications() {
    this.router.navigate(['users/notifications']);
  }

}
