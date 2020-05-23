import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeSettingComponent } from './trade-setting.component';

describe('TradeSettingComponent', () => {
  let component: TradeSettingComponent;
  let fixture: ComponentFixture<TradeSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
