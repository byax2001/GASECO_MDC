import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CilindrosCliente } from './cilindros-cliente';

describe('CilindrosCliente', () => {
  let component: CilindrosCliente;
  let fixture: ComponentFixture<CilindrosCliente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CilindrosCliente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CilindrosCliente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
