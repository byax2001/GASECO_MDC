import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiqViaTable } from './liq-via-table';

describe('LiqViaTable', () => {
  let component: LiqViaTable;
  let fixture: ComponentFixture<LiqViaTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiqViaTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiqViaTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
