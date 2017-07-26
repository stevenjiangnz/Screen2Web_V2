import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StockService } from '../services/stock.service';

import { HomePortalComponent } from './home-portal.component';
// check this: https://stackoverflow.com/questions/40003575/angular-2-error-no-provider-for-http-in-karma-jasmine-test
describe('HomePortalComponent', () => {
  let component: HomePortalComponent;
  let fixture: ComponentFixture<HomePortalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePortalComponent]
    }).overrideComponent(HomePortalComponent, {
      set: {
        providers: [
          { provide: StockService, useClass: MockStockService }
        ]
      }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

});

class MockStockService {
  getOnlineStatus(url: String) {
    return 'test';
  }

  getStocks() {
    return [{ name: '2' }];
  }
}

