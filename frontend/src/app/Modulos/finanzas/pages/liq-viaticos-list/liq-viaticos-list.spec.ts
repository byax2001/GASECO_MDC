import { ComponentFixture, TestBed } from '@angular/core/testing';

import  LiqViaticosList  from './liq-viaticos-list';

describe('LiqViaticosList', () => {
  let component: LiqViaticosList;
  let fixture: ComponentFixture<LiqViaticosList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiqViaticosList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiqViaticosList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
