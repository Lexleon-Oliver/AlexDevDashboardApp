import { TestBed } from '@angular/core/testing';

import { PowerSuppliesService } from './power-supplies.service';

describe('PowerSuppliesService', () => {
  let service: PowerSuppliesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PowerSuppliesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
