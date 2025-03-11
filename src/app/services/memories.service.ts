import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RequestService } from './request.service';
import { Memory } from '../models/memory';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class MemoriesService extends GenericService<Memory> {
  protected API = environment.apiUrl + '/inventory/memories';

  constructor(
    httpClient: HttpClient,
    requestService: RequestService
  ) {
    super(httpClient, requestService);
  }
}

