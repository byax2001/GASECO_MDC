import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscanearCilindros } from './escanear-cilindros';

describe('EscanearCilindros', () => {
  let component: EscanearCilindros;
  let fixture: ComponentFixture<EscanearCilindros>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EscanearCilindros]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EscanearCilindros);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
