import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cardg } from './cardm';

describe('Cardg', () => {
  let component: Cardg;
  let fixture: ComponentFixture<Cardg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cardg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cardg);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
