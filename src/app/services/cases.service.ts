import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RequestService } from './request.service';
import { Case } from '../models/case';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class CasesService extends GenericService<Case> {
  protected API = environment.apiUrl + '/inventory/cases';

  constructor(
    httpClient: HttpClient,
    requestService: RequestService
  ) {
    super(httpClient, requestService);
  }
}
