import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
import { ObjHelper } from '../../utils/obj-helper';
import { ToasterService } from 'angular2-toaster';
import { TradeService } from '../../services/trade.service';
import { ShareService } from '../../services/share.service';
import { TickerService } from '../../services/ticker.service';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss']
})
export class OrderEditComponent implements OnInit {
  orderForm: FormGroup;

  private shares;
  private tradeSetting;
  private latestTicker;
  private nextTicker;
  private openPeeked = false;
  private closePeeked = false;

  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, private _sanitizer: DomSanitizer, private _toasterService: ToasterService,
    private _tradeService: TradeService, private _shareService: ShareService, private _tickerService: TickerService) {

    this.createForm();
  }

  async ngOnInit() {
    this.shares = await this._shareService.getShareList();
    this.tradeSetting = await this._tradeService.getTradeSetting();
  }

  createForm() {
    this.orderForm = this.fb.group({
      share: ['', Validators.required],
      tradingDate: ['', Validators.required]
    });
  }

  autocompleListFormatter = (data: any) : SafeHtml => {
    const html = `<span>${data.symbol} - ${data.name}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  async onShareChanged(event) {
    if (this.tradeSetting && this.tradeSetting.currentZone && this.tradeSetting.currentZone.id > 0) {
      this.latestTicker = await this._tickerService.getLatestByZone(event.id, this.tradeSetting.currentZone.id);

      if (this.latestTicker) {
        this.orderForm.patchValue({tradingDate: this.latestTicker.tradingDate});
      } else {
        this.orderForm.patchValue({tradingDate: null});
      }

      this.nextTicker = await this._tickerService.getLatestByZone(event.id, this.tradeSetting.currentZone.id);
      this.openPeeked = false;
      this.closePeeked = false;
    }
  }

  async onShareKey(event) {
    if (typeof this.orderForm.value.share === 'string') {
      this.orderForm.patchValue({tradingDate: null});
      this.latestTicker = null;
      this.nextTicker = null;
      this.openPeeked = false;
      this.closePeeked = false;
    }
  }

  onPeekOpen() {
    this.openPeeked = true;
  }

  onPeekClose() {
    this.closePeeked = true;
  }

}
