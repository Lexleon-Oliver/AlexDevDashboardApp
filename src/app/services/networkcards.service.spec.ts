import { TestBed } from '@angular/core/testing';

import { NetworkcardsService } from './networkcards.service';

describe('NetworkcardsService', () => {
  let service: NetworkcardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetworkcardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
