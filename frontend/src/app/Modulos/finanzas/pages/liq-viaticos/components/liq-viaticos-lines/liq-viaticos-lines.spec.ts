import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiqViaticosLines } from './liq-viaticos-lines';

describe('LiqViaticosLines', () => {
  let component: LiqViaticosLines;
  let fixture: ComponentFixture<LiqViaticosLines>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiqViaticosLines]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiqViaticosLines);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
