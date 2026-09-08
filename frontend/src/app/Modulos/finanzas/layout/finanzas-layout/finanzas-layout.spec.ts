import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanzasLayout } from './finanzas-layout';

describe('FinanzasLayout', () => {
  let component: FinanzasLayout;
  let fixture: ComponentFixture<FinanzasLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanzasLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanzasLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
