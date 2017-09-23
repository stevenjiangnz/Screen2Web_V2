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
export class StockDetailComponent implements OnInit, AfterViewInit {
  private alive = true; // flag for event listeners
  private subscription: ISubscription;
  private currentShareId: number;
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
      this.subscription = this._messageService.currentState$
      .takeWhile(() => this.alive)
      .subscribe(async (state) => {
        // this._logger.info('in receiver of details: ' + state.shareId);
        this.currentShareId = state.shareId;

        if (!this.selectedTab) {
          (this.tabSet as any).select('profile');
        }

        await this.displayContent();
      });

     }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log((this.tabSet as any).activeId);
  }

  private tabChange(event) {
    console.log('tab change: ', event);
  }

  private async displayContent() {
    this.currentShare = await this._shareService.getShareByID(this.currentShareId);
    // console.log(this.currentShare);
  }
}
