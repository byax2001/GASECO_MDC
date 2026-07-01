import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCilindros } from './table-cilindros';

describe('TableCilindros', () => {
  let component: TableCilindros;
  let fixture: ComponentFixture<TableCilindros>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableCilindros]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableCilindros);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
