import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDebounce } from './search-debounce';

describe('SearchDebounce', () => {
  let component: SearchDebounce;
  let fixture: ComponentFixture<SearchDebounce>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchDebounce]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchDebounce);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
