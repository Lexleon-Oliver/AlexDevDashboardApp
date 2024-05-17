import { Component, Input } from '@angular/core';
import { NotificationItem } from '../../models/notification-item';
import { SlicePipe } from '@angular/common';

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

  @Input() notification!: NotificationItem;

  constructor() {

  }

}
