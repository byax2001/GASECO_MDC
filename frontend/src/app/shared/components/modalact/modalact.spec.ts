import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modalact } from './modalact';

describe('Modalact', () => {
  let component: Modalact;
  let fixture: ComponentFixture<Modalact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modalact]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Modalact);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
