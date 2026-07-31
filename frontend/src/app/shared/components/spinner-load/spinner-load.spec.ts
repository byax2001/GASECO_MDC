import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerLoad } from './spinner-load';

describe('SpinnerLoad', () => {
  let component: SpinnerLoad;
  let fixture: ComponentFixture<SpinnerLoad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerLoad]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinnerLoad);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
