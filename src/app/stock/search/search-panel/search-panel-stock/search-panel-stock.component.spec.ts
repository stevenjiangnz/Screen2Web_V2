import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPanelStockComponent } from './search-panel-stock.component';

describe('SearchPanelStockComponent', () => {
  let component: SearchPanelStockComponent;
  let fixture: ComponentFixture<SearchPanelStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPanelStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPanelStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
