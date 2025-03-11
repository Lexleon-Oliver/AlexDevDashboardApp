import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RequestService } from './request.service';
import { CartridgeToner } from '../models/cartridge-toner';

@Injectable({
  providedIn: 'root'
})
export class CartridgeTonersService extends GenericService<CartridgeToner> {
  protected API = environment.apiUrl + '/inventory/cartridgetoners';

  constructor(
    httpClient: HttpClient,
    requestService: RequestService
  ) {
    super(httpClient, requestService);
  }
}
