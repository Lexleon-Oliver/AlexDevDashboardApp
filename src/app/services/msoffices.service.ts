import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Msoffice } from '../models/msoffice';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class MsofficesService extends GenericService<Msoffice> {
  protected API = environment.apiUrl + '/softwares/msoffices';

  constructor(
    httpClient: HttpClient,
    requestService: RequestService
  ) {
    super(httpClient, requestService);
  }
}
