import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { RequestService } from './request.service';
import { HttpClient } from '@angular/common/http';
import { PowerSupply } from '../models/power-supply';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class PowerSuppliesService extends GenericService<PowerSupply> {
  protected API = environment.apiUrl + '/inventory/powersupplies';

  constructor(
    httpClient: HttpClient,
    requestService: RequestService
  ) {
    super(httpClient, requestService);
  }
}
