import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task';
import { RequestService } from './request.service';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService extends GenericService<Task> {
  protected API = environment.apiUrl + '/tasks';

  constructor(
    httpClient: HttpClient,
    requestService: RequestService
  ) {
    super(httpClient, requestService);
  }
}

