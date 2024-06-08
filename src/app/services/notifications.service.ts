import { RequestService } from './request.service';
import { Injectable } from '@angular/core';
import { MyNotification } from '../models/my-notification';
import { DataHoraService } from './data-hora.service';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RequestResponse } from '../models/request-response';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private readonly apiUrl = environment.apiUrl;
  private notificationList: MyNotification[] = [];
  private selectedNotification!: MyNotification;


  constructor(
    private dataHoraService: DataHoraService,
    private http: HttpClient,
    private requestService: RequestService
  ) { }

  setNotifications( notifications: MyNotification[] ){
    this.notificationList = notifications;
  }

  getNotifications(): MyNotification[] {
    return this.notificationList;
  }

  getNotificationsSize(): number{
    return this.notificationList.length;
  }

  setSelectedNotification(notification: MyNotification): void {
    this.selectedNotification = notification;
  }

  getSelectedNotification(): MyNotification{
    return this.selectedNotification;
  }

  markAsRead(id: number) {
    if(this.selectedNotification.id ===id){
      if(!this.selectedNotification.readedAt){
        this.selectedNotification.readedAt = this.dataHoraService.formatarDataHoraAtual();
        this.http.put<RequestResponse>(`${this.apiUrl}/users/mydetails/notifications/${id}`, this.selectedNotification).subscribe({
          next: (data:RequestResponse) => {
            this.requestService.trataSucesso(data);
          },
          error: (error) => {
            this.requestService.trataErro(error);
          }
        });
      }
    }
  }

  getUnreadNotificationsSize(): number {
    return this.notificationList.filter(notification => !notification.readedAt).length;
  }

  getUnreadNotifications(): MyNotification[] {
    return this.notificationList.filter(notification => !notification.readedAt);
  }
}

