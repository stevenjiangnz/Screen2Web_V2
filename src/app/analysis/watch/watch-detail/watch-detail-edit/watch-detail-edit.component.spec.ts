import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchDetailEditComponent } from './watch-detail-edit.component';

describe('WatchDetailEditComponent', () => {
  let component: WatchDetailEditComponent;
  let fixture: ComponentFixture<WatchDetailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchDetailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
