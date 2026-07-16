import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaCilindrosEsc } from './tabla-cilindros-esc';

describe('TablaCilindrosEsc', () => {
  let component: TablaCilindrosEsc;
  let fixture: ComponentFixture<TablaCilindrosEsc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaCilindrosEsc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaCilindrosEsc);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
