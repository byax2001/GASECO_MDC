import { ComponentFixture, TestBed } from '@angular/core/testing';

import  VendedoresRV  from './vendedores-rv';

describe('VendedoresRV', () => {
  let component: VendedoresRV;
  let fixture: ComponentFixture<VendedoresRV>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendedoresRV]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendedoresRV);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
