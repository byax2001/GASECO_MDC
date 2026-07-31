import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopMenuVentas } from './top-menu';

describe('TopMenu', () => {
  let component: TopMenuVentas;
  let fixture: ComponentFixture<TopMenuVentas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopMenuVentas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopMenuVentas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
