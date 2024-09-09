import { TestBed } from '@angular/core/testing';

import { GraphicscardsService } from './graphicscards.service';

describe('GraphicscardsService', () => {
  let service: GraphicscardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphicscardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
