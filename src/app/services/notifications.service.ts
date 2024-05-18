import { Injectable } from '@angular/core';
import { MyNotification } from '../models/my-notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private notificationList: MyNotification[] = [];


  constructor() { }

  setNotifications( notifications: MyNotification[] ){
    this.notificationList = notifications;
  }

  getNotifications(): MyNotification[] {
    return this.notificationList;
  }

  getNotificationsSize(): number{
    return this.notificationList.length;
  }
}

