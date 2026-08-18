import { ComponentFixture, TestBed } from '@angular/core/testing';

import  MoleculasRV  from './moleculas-rv';

describe('MoleculasRV', () => {
  let component: MoleculasRV;
  let fixture: ComponentFixture<MoleculasRV>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoleculasRV]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoleculasRV);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
