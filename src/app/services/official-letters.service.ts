import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { OfficialLetter } from '../models/official-letter';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class OfficialLettersService extends GenericService<OfficialLetter> {
  protected API = environment.apiUrl + '/docs/officialletters';

  constructor(
    httpClient: HttpClient,
    requestService: RequestService
  ) {
    super(httpClient, requestService);
  }
}
