import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Inputg } from './inputg';

describe('Inputg', () => {
  let component: Inputg;
  let fixture: ComponentFixture<Inputg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Inputg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Inputg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
