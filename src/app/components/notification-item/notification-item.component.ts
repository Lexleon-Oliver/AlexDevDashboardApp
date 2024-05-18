import { Component, Input } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { MyNotification } from '../../models/my-notification';

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

  constructor() {

  }

}
