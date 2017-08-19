import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { TreeModule } from 'angular-tree-component';

import { StockNavComponent } from './stock-nav/stock-nav.component';
import { StockListComponent } from './stock-list.component';
import { ShareService } from '../services/share.service';


describe('StockListComponent', () => {
  let component: StockListComponent;
  let fixture: ComponentFixture<StockListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockListComponent, StockNavComponent ],
      imports: [TreeModule, HttpModule],
      providers: [ShareService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
