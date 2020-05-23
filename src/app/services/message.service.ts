import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { StateEvent } from '../model/EntityDefinitions';

@Injectable()
export class MessageService {

  private currentState = new Subject<StateEvent>();
  private currentTicker = new Subject<StateEvent>();
  private tradeSetting = new Subject<any>();
  private tradingDate = new Subject<any>();
  private tradingOrder = new Subject<any>();

  currentState$ = this.currentState.asObservable();
  currentTicker$ = this.currentTicker.asObservable();
  tradeSetting$ = this.tradeSetting.asObservable();
  tradingDate$ = this.tradingDate.asObservable();
  tradingOrder$ = this.tradingOrder.asObservable();

  constructor() { }

  publishStockSelect(data: StateEvent) {
    this.currentState.next(data);
  }

  publishTickerSelect(data: StateEvent) {
    this.currentTicker.next(data);
  }

  publishTradeSettingChange(data: any) {
    this.tradeSetting.next(data);
  }

  publishTradingDateChange(data: any) {
    this.tradingDate.next(data);
  }

  publishTradingOrderChange(data: any) {
    this.tradingOrder.next(data);
  }
}
