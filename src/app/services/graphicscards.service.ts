import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { environment } from '../../environments/environment';
import { GraphicsCard } from '../models/graphics-card';
import { HttpClient } from '@angular/common/http';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class GraphicscardsService extends GenericService<GraphicsCard> {
  protected API = environment.apiUrl + '/inventory/graphicscards';

  constructor(
    httpClient: HttpClient,
    requestService: RequestService
  ) {
    super(httpClient, requestService);
  }
}
