import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { RequestService } from './request.service';
import { HttpClient } from '@angular/common/http';
import { PowerSupply } from '../models/power-supply';
import { GenericService } from './generic.service';
import { Computer } from '../models/computer';

@Injectable({
  providedIn: 'root'
})
export class ComputersService extends GenericService<Computer> {
  protected API = environment.apiUrl + '/computers';

  constructor(
    httpClient: HttpClient,
    requestService: RequestService
  ) {
    super(httpClient, requestService);
  }
}
