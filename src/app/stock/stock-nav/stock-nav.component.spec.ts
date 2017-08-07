import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TreeModule } from 'angular-tree-component';

import { StockNavComponent } from './stock-nav.component';

describe('StockNavComponent', () => {
  let component: StockNavComponent;
  let fixture: ComponentFixture<StockNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockNavComponent ],
      imports: [TreeModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
