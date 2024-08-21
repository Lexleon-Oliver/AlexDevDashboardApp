import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { NetworkCard } from '../models/networkcard';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class NetworkcardsService extends GenericService<NetworkCard> {
  protected API = environment.apiUrl + '/inventory/networkcards';

  constructor(
    httpClient: HttpClient,
    requestService: RequestService
  ) {
    super(httpClient, requestService);
  }
}
