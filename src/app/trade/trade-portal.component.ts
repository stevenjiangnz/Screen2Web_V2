import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-trade-portal',
  templateUrl: './trade-portal.component.html',
  styleUrls: ['./trade-portal.component.scss']
})
export class TradePortalComponent implements OnInit, OnDestroy {
  private alive = true;
  // private subscription: ISubscription;

  constructor(private _messageService: MessageService) {

    this._messageService.tradeSetting$
      .takeWhile(() => this.alive)
      .subscribe(state => {
        console.log('new trade setting', state);
      });

    this._messageService.tradingDate$
      .takeWhile(() => this.alive)
      .subscribe(state => {
        console.log('new trading Date', state);
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
