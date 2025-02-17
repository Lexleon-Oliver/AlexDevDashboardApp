import { TestBed } from '@angular/core/testing';

import { PurchaseordersService } from './purchaseorders.service';

describe('PurchaseordersService', () => {
  let service: PurchaseordersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseordersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
