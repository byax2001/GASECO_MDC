import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarSuc } from './navbarsuc';

describe('NavbarSuc', () => {
  let component: NavbarSuc;
  let fixture: ComponentFixture<NavbarSuc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarSuc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarSuc);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
