import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPanelWatchComponent } from './search-panel-watch.component';

describe('SearchPanelWatchComponent', () => {
  let component: SearchPanelWatchComponent;
  let fixture: ComponentFixture<SearchPanelWatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPanelWatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPanelWatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
