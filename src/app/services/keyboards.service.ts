import { Injectable } from '@angular/core';
import { Keyboard } from '../models/keyboard';
import { GenericService } from './generic.service';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class KeyboardsService extends GenericService<Keyboard> {
  protected API = environment.apiUrl + '/inventory/keyboards';

  constructor(
    httpClient: HttpClient,
    requestService: RequestService
  ) {
    super(httpClient, requestService);
  }
}
