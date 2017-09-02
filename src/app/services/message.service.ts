import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { StateEvent } from '../model/EntityDefinitions';

@Injectable()
export class MessageService {

  private currentState = new Subject<StateEvent>();

  currentState$ = this.currentState.asObservable();

  constructor() { }

  // Service message commands
  publishStockSelect(data: StateEvent) {
    this.currentState.next(data);
  }
}
