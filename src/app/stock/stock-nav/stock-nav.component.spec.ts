import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockNavComponent } from './stock-nav.component';

describe('StockNavComponent', () => {
  let component: StockNavComponent;
  let fixture: ComponentFixture<StockNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockNavComponent ]
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
