import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OVPendientes } from './ovpendientes';

describe('OVPendientes', () => {
  let component: OVPendientes;
  let fixture: ComponentFixture<OVPendientes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OVPendientes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OVPendientes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
