import { Injectable } from '@angular/core';
import { Mouse } from '../models/mouse';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RequestService } from './request.service';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class MousesService extends GenericService<Mouse> {
  protected API = environment.apiUrl + '/inventory/mouses';

  constructor(
    httpClient: HttpClient,
    requestService: RequestService
  ) {
    super(httpClient, requestService);
  }
}
