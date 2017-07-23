import { Injectable } from '@angular/core';
import { ServiceAccessService } from './service-access.service';


@Injectable()
export class StockService {
  public stockList: Array<any>;

  constructor(private serviceAccess: ServiceAccessService) {
    this.stockList = [{name: '2'}];
   }

  getStocks() {
    this.stockList[0].name = this.serviceAccess.getTestString();
    return this.stockList;
  }

}
