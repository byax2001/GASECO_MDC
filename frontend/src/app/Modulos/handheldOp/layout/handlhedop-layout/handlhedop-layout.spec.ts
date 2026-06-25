import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandlhedopLayout } from './handlhedop-layout';

describe('HandlhedopLayout', () => {
  let component: HandlhedopLayout;
  let fixture: ComponentFixture<HandlhedopLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HandlhedopLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HandlhedopLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
