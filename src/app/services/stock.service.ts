import { Injectable } from '@angular/core';
import { ServiceAccessService } from './service-access.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StockService {
  public stockList: Array<any>;

  constructor(private serviceAccess: ServiceAccessService) {
    this.stockList = [{name: '2'}];
   }

  getStocks() {
     this.stockList[0].name = 'from mock';
    return this.stockList;
  }

  getWords(): Observable<string[]> {
    const obsString: Observable<string[]> = new Observable<string[]>(observer => {
      setTimeout(() => {
        observer.next(['1']);
      }, 1000);
    });
    return obsString;
  }
}
