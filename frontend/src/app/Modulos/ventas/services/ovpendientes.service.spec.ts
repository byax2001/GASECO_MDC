import { TestBed } from '@angular/core/testing';

import { OVPendientesService } from './ovpendientes.service';

describe('OVPendientesService', () => {
  let service: OVPendientesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OVPendientesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
