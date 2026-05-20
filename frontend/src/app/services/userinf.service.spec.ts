import { TestBed } from '@angular/core/testing';

import { UserinfService } from './userInfo.service';

describe('UserinfService', () => {
  let service: UserinfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserinfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
