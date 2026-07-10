import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannerCil } from './scanner-cil';

describe('ScannerCil', () => {
  let component: ScannerCil;
  let fixture: ComponentFixture<ScannerCil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScannerCil]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScannerCil);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
