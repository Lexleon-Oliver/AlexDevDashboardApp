import { Component, Input } from '@angular/core';
import { MyNotification } from '../../models/my-notification';
import { NotificationsService } from '../../services/notifications.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications-item-list',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './notifications-item-list.component.html',
  styleUrl: './notifications-item-list.component.scss'
})
export class NotificationsItemListComponent {

  @Input() notificacao! : MyNotification;

  constructor(
    private notificationService: NotificationsService
  ){}

  onClick() {
    this.notificationService.setSelectedNotification(this.notificacao);
    this.notificationService.markAsRead(this.notificacao.id);

  }
}
