import { ComponentFixture, TestBed } from '@angular/core/testing';

import  LiqViaticos  from './liq-viaticos';

describe('LiqViaticos', () => {
  let component: LiqViaticos;
  let fixture: ComponentFixture<LiqViaticos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiqViaticos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiqViaticos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
