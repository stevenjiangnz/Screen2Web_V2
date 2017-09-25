import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { StateEvent } from '../model/EntityDefinitions';

@Injectable()
export class MessageService {

  private currentState = new Subject<StateEvent>();
  private currentTicker = new Subject<StateEvent>();

  currentState$ = this.currentState.asObservable();
  currentTicker$ = this.currentTicker.asObservable();

  constructor() { }

  publishStockSelect(data: StateEvent) {
    this.currentState.next(data);
  }

  publishTickerSelect(data: StateEvent) {
    this.currentTicker.next(data);
  }
}
