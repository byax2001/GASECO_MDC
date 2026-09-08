import { ComponentFixture, TestBed } from '@angular/core/testing';

import  FinanzasHome  from './finanzas-home';

describe('FinanzasHome', () => {
  let component: FinanzasHome;
  let fixture: ComponentFixture<FinanzasHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanzasHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanzasHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
