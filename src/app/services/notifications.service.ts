import { Injectable } from '@angular/core';
import { NotificationItem } from '../models/notification-item';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private notificationList: NotificationItem[] = [
    {
      id:0,
      title:"Lorem Ipsum",
      content:"Quae dolorem earum veritatis oditseno",
      createdAt: "há 30 min.",
      icon:"bi bi-exclamation-circle text-warning",
      readedAt: ""
    },
    {
      id:1,
      title:"Atque rerum nesciunt",
      content:"Quae dolorem earum veritatis oditseno",
      createdAt: "há 1 hr.",
      icon:"bi bi-x-circle text-danger",
      readedAt: ""
    },
    {
      id:2,
      title:"Sit rerum fuga",
      content:"Quae dolorem earum veritatis oditseno",
      createdAt: "há 2 hrs.",
      icon:"bi bi-check-circle text-success",
      readedAt: ""
    },
    {
      id:3,
      title:"Dicta reprehenderit",
      content:"Quae dolorem earum veritatis oditseno",
      createdAt: "há 4 hrs.",
      icon:"bi-info-circle text-primary",
      readedAt: ""
    },
  ];


  constructor() { }

  getNotifications(): NotificationItem[] {
    return this.notificationList;
  }

  getNotificationsSize(): number{
    return this.notificationList.length;
  }
}

