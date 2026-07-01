import { TestBed } from '@angular/core/testing';

import { PresupuestoqueryServiceTs } from './presupuestoquery.service';

describe('PresupuestoqueryServiceTs', () => {
  let service: PresupuestoqueryServiceTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PresupuestoqueryServiceTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
