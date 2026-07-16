import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioLayout } from './inventario-layout';

describe('InventarioLayout', () => {
  let component: InventarioLayout;
  let fixture: ComponentFixture<InventarioLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventarioLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventarioLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
