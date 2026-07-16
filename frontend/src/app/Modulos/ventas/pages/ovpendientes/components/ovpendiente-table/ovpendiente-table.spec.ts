import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OVPendienteTable } from './ovpendiente-table';

describe('OVPendienteTable', () => {
  let component: OVPendienteTable;
  let fixture: ComponentFixture<OVPendienteTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OVPendienteTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OVPendienteTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
