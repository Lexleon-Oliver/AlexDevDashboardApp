import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RequestService } from './request.service';
import { Processor } from '../models/processor';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class ProcessorsService extends GenericService<Processor> {
  protected API = environment.apiUrl + '/inventory/cpus';

  constructor(
    httpClient: HttpClient,
    requestService: RequestService
  ) {
    super(httpClient, requestService);
  }
}
