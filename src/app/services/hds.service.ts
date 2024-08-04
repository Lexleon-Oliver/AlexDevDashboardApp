import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RequestService } from './request.service';
import { Hd } from '../models/hd';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root',
})
export class HdsService extends GenericService<Hd> {
  protected API = environment.apiUrl + '/inventory/hds';

  constructor(
    httpClient: HttpClient,
    requestService: RequestService
  ) {
    super(httpClient, requestService);
  }
}
