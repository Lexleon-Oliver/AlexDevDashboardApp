import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { OperationalSystem } from '../models/operational-system';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class OperationalSystemsService extends GenericService<OperationalSystem> {
  protected API = environment.apiUrl + '/inventory/operationsystems';

  constructor(
    httpClient: HttpClient,
    requestService: RequestService
  ) {
    super(httpClient, requestService);
  }
}
