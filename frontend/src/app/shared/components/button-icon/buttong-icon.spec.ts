import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Buttong } from './button-icon';

describe('Buttong', () => {
  let component: Buttong;
  let fixture: ComponentFixture<Buttong>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Buttong]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Buttong);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
