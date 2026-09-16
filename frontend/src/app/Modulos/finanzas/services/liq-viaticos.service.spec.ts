import { TestBed } from '@angular/core/testing';

import { LiqViaticosService } from './liq-viaticos.service';

describe('LiqViaticosService', () => {
  let service: LiqViaticosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiqViaticosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
