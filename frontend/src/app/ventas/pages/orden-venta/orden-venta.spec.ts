import { ComponentFixture, TestBed } from '@angular/core/testing';

import {OrdenVenta} from './orden-venta';

describe('OrdenVenta', () => {
  let component: OrdenVenta;
  let fixture: ComponentFixture<OrdenVenta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdenVenta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdenVenta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
