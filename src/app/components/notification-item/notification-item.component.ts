import { NotificationsService } from './../../services/notifications.service';
import { Component, Input } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { MyNotification } from '../../models/my-notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification-item',
  standalone: true,
  imports: [
    SlicePipe
  ],
  templateUrl: './notification-item.component.html',
  styleUrl: './notification-item.component.scss'
})
export class NotificationItemComponent {


  @Input() notification!: MyNotification;

  constructor(
    private notificationsService:NotificationsService,
    private router: Router
  ) {

  }

  openNotification(notification: MyNotification) {
    this.notificationsService.setSelectedNotification(notification)
    this.notificationsService.markAsRead(notification.id);
    this.router.navigate(['users/notifications']);
    }

}
