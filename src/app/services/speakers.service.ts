import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RequestService } from './request.service';
import { Speaker } from '../models/speaker';

@Injectable({
  providedIn: 'root'
})
export class SpeakersService extends GenericService<Speaker> {
  protected API = environment.apiUrl + '/inventory/speakers';

  constructor(
    httpClient: HttpClient,
    requestService: RequestService
  ) {
    super(httpClient, requestService);
  }
}
