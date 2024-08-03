import { TestBed } from '@angular/core/testing';

import { HdsService } from './hds.service';

describe('HdsService', () => {
  let service: HdsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HdsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
