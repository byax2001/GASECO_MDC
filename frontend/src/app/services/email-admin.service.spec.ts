import { TestBed } from '@angular/core/testing';

import { EmailAdminService } from './email-admin.service';

describe('EmailAdminService', () => {
  let service: EmailAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
