import { ComponentFixture, TestBed } from '@angular/core/testing';

import  OrdenHeader  from './orden-header';

describe('OrdenHeader', () => {
  let component: OrdenHeader;
  let fixture: ComponentFixture<OrdenHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdenHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdenHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
