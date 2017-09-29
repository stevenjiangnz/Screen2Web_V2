import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockNavTreeComponent } from './stock-nav-tree.component';

describe('StockNavTreeComponent', () => {
  let component: StockNavTreeComponent;
  let fixture: ComponentFixture<StockNavTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockNavTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockNavTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
