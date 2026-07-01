import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableClientes } from './table-clientes';

describe('TableClientes', () => {
  let component: TableClientes;
  let fixture: ComponentFixture<TableClientes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableClientes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableClientes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
