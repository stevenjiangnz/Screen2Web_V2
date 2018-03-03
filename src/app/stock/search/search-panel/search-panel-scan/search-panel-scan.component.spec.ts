import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPanelScanComponent } from './search-panel-scan.component';

describe('SearchPanelScanComponent', () => {
  let component: SearchPanelScanComponent;
  let fixture: ComponentFixture<SearchPanelScanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPanelScanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPanelScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
