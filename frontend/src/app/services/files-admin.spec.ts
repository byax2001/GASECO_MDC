import { TestBed } from '@angular/core/testing';

import { FilesAdmin } from './files-admin.service';

describe('FilesAdmin', () => {
  let service: FilesAdmin;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilesAdmin);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
