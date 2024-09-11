import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { environment } from '../../environments/environment';
import { GraphicsCard } from '../models/graphics-card';
import { HttpClient } from '@angular/common/http';
import { RequestService } from './request.service';
import { Monitor } from '../models/monitor';

@Injectable({
  providedIn: 'root'
})
export class MonitorsService extends GenericService<Monitor> {
  protected API = environment.apiUrl + '/inventory/monitors';

  constructor(
    httpClient: HttpClient,
    requestService: RequestService
  ) {
    super(httpClient, requestService);
  }
}
