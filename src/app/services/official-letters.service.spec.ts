import { TestBed } from '@angular/core/testing';

import { OfficialLettersService } from './official-letters.service';

describe('OfficialLettersService', () => {
  let service: OfficialLettersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfficialLettersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
