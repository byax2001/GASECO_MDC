import { TestBed } from '@angular/core/testing';

import { VentasQueryService } from './ventasquery.service';

describe('VentasQueryService', () => {
  let service: VentasQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VentasQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
