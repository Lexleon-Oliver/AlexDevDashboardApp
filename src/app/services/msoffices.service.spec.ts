import { TestBed } from '@angular/core/testing';

import { MsofficesService } from './msoffices.service';

describe('MsofficesService', () => {
  let service: MsofficesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MsofficesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
