import { Injectable } from '@angular/core';

@Injectable()
export class StockService {
  public stockList: Array<any>;

  constructor() {
    this.stockList = [{name: '2'}];
   }

  getStocks() {
    return this.stockList;
  }

}
