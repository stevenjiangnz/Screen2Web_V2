import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradePositionComponent } from './trade-position.component';

describe('TradePositionComponent', () => {
  let component: TradePositionComponent;
  let fixture: ComponentFixture<TradePositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradePositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradePositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
