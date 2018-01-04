import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeProfileComponent } from './trade-profile.component';

describe('TradeProfileComponent', () => {
  let component: TradeProfileComponent;
  let fixture: ComponentFixture<TradeProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
