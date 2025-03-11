import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RequestService } from './request.service';
import { GenericService } from './generic.service';
import { Department } from '../models/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService extends GenericService<Department> {
  protected API = environment.apiUrl + '/inventory/departments';

  constructor(
    httpClient: HttpClient,
    requestService: RequestService
  ) {
    super(httpClient, requestService);
  }
}
