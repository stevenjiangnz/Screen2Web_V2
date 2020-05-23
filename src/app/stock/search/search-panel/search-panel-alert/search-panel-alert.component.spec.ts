import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPanelAlertComponent } from './search-panel-alert.component';

describe('SearchPanelAlertComponent', () => {
  let component: SearchPanelAlertComponent;
  let fixture: ComponentFixture<SearchPanelAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPanelAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPanelAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
