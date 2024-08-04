import { TestBed } from '@angular/core/testing';

import { MousesService } from './mouses.service';

describe('MousesService', () => {
  let service: MousesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MousesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
