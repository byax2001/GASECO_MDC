import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiqViaticosHeader } from './liq-viaticos-header';

describe('LiqViaticosHeader', () => {
  let component: LiqViaticosHeader;
  let fixture: ComponentFixture<LiqViaticosHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiqViaticosHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiqViaticosHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
