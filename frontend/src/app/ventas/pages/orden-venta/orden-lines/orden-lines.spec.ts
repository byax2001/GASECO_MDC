import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenLines } from './orden-lines';

describe('OrdenLines', () => {
  let component: OrdenLines;
  let fixture: ComponentFixture<OrdenLines>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdenLines]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdenLines);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
