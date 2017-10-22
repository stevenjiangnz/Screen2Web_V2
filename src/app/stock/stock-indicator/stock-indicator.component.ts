import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { ISubscription } from 'rxjs/Subscription';
import { HttpModule, Http } from '@angular/http';
import { ObjHelper } from '../../utils/obj-helper';
import { Share, StateEvent } from '../../model/EntityDefinitions';
import { MessageService } from '../../services/message.service';
import { ShareService } from '../../services/share.service';
import { SharedService } from '../../services/shared.service';
import { TickerService } from '../../services/ticker.service';
import { TradeService } from '../../services/trade.service';
import { UtilityService } from '../../services/utility.service';

@Component({
  selector: 'app-stock-indicator',
  templateUrl: './stock-indicator.component.html',
  styleUrls: ['./stock-indicator.component.scss']
})
export class StockIndicatorComponent implements OnInit, OnChanges {
  @Input() shareId: number;
  @Input() tradingDate: number;
  indicator: any = null;

  constructor(private _logger: Logger, private _sharedService: SharedService, 
    private _shareService: ShareService, private _utilityService: UtilityService,
    private _messageService: MessageService) { }

  ngOnInit() {
  }

  async ngOnChanges(...args: any[]) {
    if (this.shareId && this.tradingDate) {
      this._shareService.getIndicator(this.shareId, this.tradingDate).then((result) => {
        this.indicator = result;
      });
    }
  }
}
