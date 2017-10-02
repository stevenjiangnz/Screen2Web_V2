import { Component, OnInit, AfterViewInit, DoCheck, KeyValueDiffers, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { ISubscription } from 'rxjs/Subscription';
import { HttpModule, Http } from '@angular/http';
import { Share, StateEvent } from '../../model/EntityDefinitions';
import { MessageService } from '../../services/message.service';
import { ShareService } from '../../services/share.service';
import { SharedService } from '../../services/shared.service';
import { TickerService } from '../../services/ticker.service';
import { TradeService } from '../../services/trade.service';
import { UtilityService } from '../../services/utility.service';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.scss']
})
export class StockDetailComponent implements OnInit, OnDestroy, AfterViewInit {
  private alive = true; // flag for event listeners
  private subscriptionShare: ISubscription;
  private subscriptionTicker: ISubscription;
  private currentShareId: number;
  private currentTradingDate: number;
  private currentShare: Share;
  private tabSet: ViewContainerRef;
  private selectedTab: string;

  @ViewChild(NgbTabset) set content(content: ViewContainerRef) {
    this.tabSet = content;
  };

  constructor(private _logger: Logger, private _sharedService: SharedService, private _tradeService: TradeService,
    private _shareService: ShareService, private _tickerService: TickerService, private _utilityService: UtilityService,
    private _messageService: MessageService,
    private http: Http, private differs: KeyValueDiffers) {
    this.subscriptionShare = this._messageService.currentState$
      .takeWhile(() => this.alive)
      .subscribe(async (state) => {
        this.currentShareId = state.shareId;

        if (!this.selectedTab) {
          (this.tabSet as any).select('profile');
        }

        await this.displayContent();
      });

    this.subscriptionTicker = this._messageService.currentTicker$
      .takeWhile(() => this.alive)
      .subscribe(async (state) => {
        this.displayIndicator(state.shareId, state.data.tradingDate);
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.alive = false;
  }

  ngAfterViewInit() {
    this.selectedTab = (this.tabSet as any).activeId;
  }

  private tabChange(event) {
    this.selectedTab = event.nextId;
  }

  private async displayContent() {
    this.currentShare = await this._shareService.getShareByID(this.currentShareId);
  }

  private displayIndicator(shareId: number, tradingDate: number) {
    (this.tabSet as any).select('indicator');

    this.currentShareId = shareId;
    this.currentTradingDate = tradingDate;
  }
}
