import { Component } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-full-notification-item',
  standalone: true,
  imports: [
    CardComponent
  ],
  templateUrl: './full-notification-item.component.html',
  styleUrl: './full-notification-item.component.scss'
})
export class FullNotificationItemComponent {

  constructor(
    public notificacaoService:NotificationsService
  ) { }
}
