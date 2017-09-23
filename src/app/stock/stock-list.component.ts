import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from '../services/message.service';
import { StateEvent } from '../model/EntityDefinitions';
import { ISubscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/takeWhile';
import { ShareService } from '../services/share.service';
import { Logger } from 'angular2-logger/core';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit, OnDestroy {
  private subscription: ISubscription;
  private alive = true;

  constructor(private _logger: Logger, private messageService: MessageService) {
    this.subscription = this.messageService.currentState$
    .takeWhile(() => this.alive)
    .subscribe(state => {
      // this._logger.info('in receiver: ' + state.shareId);
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
