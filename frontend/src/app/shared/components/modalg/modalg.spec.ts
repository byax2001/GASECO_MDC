import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modalg } from './modalg';

describe('Modalg', () => {
  let component: Modalg;
  let fixture: ComponentFixture<Modalg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modalg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Modalg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
