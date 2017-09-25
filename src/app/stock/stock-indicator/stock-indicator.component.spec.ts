import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockIndicatorComponent } from './stock-indicator.component';

describe('StockIndicatorComponent', () => {
  let component: StockIndicatorComponent;
  let fixture: ComponentFixture<StockIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
