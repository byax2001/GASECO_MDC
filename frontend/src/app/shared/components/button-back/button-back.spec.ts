import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonBack } from './button-back';

describe('ButtonBack', () => {
  let component: ButtonBack;
  let fixture: ComponentFixture<ButtonBack>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonBack]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonBack);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
