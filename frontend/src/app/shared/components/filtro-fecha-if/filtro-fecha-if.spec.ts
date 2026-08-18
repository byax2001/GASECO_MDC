import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroFechaIF } from './filtro-fecha-if';

describe('FiltroFechaIF', () => {
  let component: FiltroFechaIF;
  let fixture: ComponentFixture<FiltroFechaIF>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltroFechaIF]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroFechaIF);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
