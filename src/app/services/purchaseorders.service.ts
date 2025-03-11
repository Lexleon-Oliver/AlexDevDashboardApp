import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RequestService } from './request.service';
import { GenericService } from './generic.service';
import { PurchaseOrder } from '../models/purchase-order';

@Injectable({
  providedIn: 'root'
})
export class PurchaseordersService extends GenericService<PurchaseOrder> {
  protected API = environment.apiUrl + '/docs/purchaseorders';

  constructor(
    httpClient: HttpClient,
    requestService: RequestService
  ) {
    super(httpClient, requestService);
  }
}
