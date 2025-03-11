import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RequestService } from './request.service';
import { Motherboard } from '../models/motherboard';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class MotherboardsService extends GenericService<Motherboard> {
  protected API = environment.apiUrl + '/inventory/motherboards';

  constructor(
    httpClient: HttpClient,
    requestService: RequestService
  ) {
    super(httpClient, requestService);
  }
}
