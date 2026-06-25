import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresupuestoTable } from './presupuesto-table';

describe('PresupuestoTable', () => {
  let component: PresupuestoTable;
  let fixture: ComponentFixture<PresupuestoTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresupuestoTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresupuestoTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
