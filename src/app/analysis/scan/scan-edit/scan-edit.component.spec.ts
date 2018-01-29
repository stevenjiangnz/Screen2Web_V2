import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanEditComponent } from './scan-edit.component';

describe('ScanEditComponent', () => {
  let component: ScanEditComponent;
  let fixture: ComponentFixture<ScanEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
