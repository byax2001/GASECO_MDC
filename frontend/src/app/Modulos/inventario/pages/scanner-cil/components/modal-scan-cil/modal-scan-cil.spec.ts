import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalScanCil } from './modal-scan-cil';

describe('ModalScanCil', () => {
  let component: ModalScanCil;
  let fixture: ComponentFixture<ModalScanCil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalScanCil]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalScanCil);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
