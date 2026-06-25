import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddLP } from './modal-add-lp';

describe('ModalAddLP', () => {
  let component: ModalAddLP;
  let fixture: ComponentFixture<ModalAddLP>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAddLP]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddLP);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
