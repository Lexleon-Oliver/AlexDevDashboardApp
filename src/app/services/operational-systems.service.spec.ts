import { TestBed } from '@angular/core/testing';

import { OperationalSystemsService } from './operational-systems.service';

describe('OperationalSystemsService', () => {
  let service: OperationalSystemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperationalSystemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
