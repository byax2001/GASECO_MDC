import { TestBed } from '@angular/core/testing';

import { CilcliService } from './cilcli.service';

describe('CilcliService', () => {
  let service: CilcliService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CilcliService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
