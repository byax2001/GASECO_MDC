import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableVentas } from './table-ventas-mol';

describe('TableVentas', () => {
  let component: TableVentas;
  let fixture: ComponentFixture<TableVentas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableVentas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableVentas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
