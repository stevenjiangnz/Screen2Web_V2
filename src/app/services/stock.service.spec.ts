import { TestBed, inject } from '@angular/core/testing';
import { StockService } from './stock.service';
import { ServiceAccessService } from './service-access.service';
import * as TypeMoq from 'typemoq';

const serviceAccessMock = TypeMoq.Mock.ofType(ServiceAccessService);

serviceAccessMock.setup(x => x.getTestString()).returns(() => 'from mock');

describe('StockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StockService,
      { provide: ServiceAccessService, useValue: serviceAccessMock.object }]
    });
  });

  it('should be created', inject([StockService], (service: StockService) => {
    expect(service).toBeTruthy();
  }));

  it('should return stock list', inject([StockService], (service: StockService) => {
    const stock = service.getStocks();
    expect(stock.length).toBeGreaterThan(0);
    expect(stock[0].name).toEqual('from mock');
  }));

});
