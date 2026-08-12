import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminpermisosGuard } from './adminpermisos.guard';

describe('adminpermisosGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminpermisosGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
