import { TestBed } from '@angular/core/testing';

import { CartridgeTonersService } from './cartridge-toners.service';

describe('CartridgeTonersService', () => {
  let service: CartridgeTonersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartridgeTonersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
