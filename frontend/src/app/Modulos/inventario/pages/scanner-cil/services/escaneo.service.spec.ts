import { TestBed } from '@angular/core/testing';

import { EscaneoService } from './escaneo.service';

describe('EscaneoService', () => {
  let service: EscaneoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EscaneoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
