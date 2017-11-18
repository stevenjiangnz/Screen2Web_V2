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
  mode = 'create';

  private shares;
  private tradeSetting;
  private latestTicker;
  private nextTicker;
  private openPeeked = false;
  private closePeeked = false;
  private reasons;
  private orderType;

  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, private _sanitizer: DomSanitizer, private _toasterService: ToasterService,
    private _tradeService: TradeService, private _shareService: ShareService, private _tickerService: TickerService) {

    this.createForm();
  }

  async ngOnInit() {
    this.shares = await this._shareService.getShareList();
    this.tradeSetting = await this._tradeService.getTradeSetting();

    this.reasons = ['MACD WR',
      'ADX Direction',
      'ADX Pullback',
      'ADX Breakout',
      'Candle Pattern',
      'Other',]
  }

  createForm() {
    this.orderForm = this.fb.group({
      share: ['', Validators.required],
      tradingDate: ['', Validators.required],
      direction: ['Long', Validators.required],
      price: [null, Validators.required],
      size: [null, Validators.required],
      stop: null,
      limit: null,
      reason: null,
      note: null,
    });

    // this.orderForm.valueChanges.subscribe(val => {
    //   console.log('value changed  ssss');
    // });
  }

  initForm() {
    if (this.mode === 'create') {
      this.orderForm.setValue({
        share: '',
        tradingDate: '',
        direction: 'Long',
        price: null,
        size: null,
        stop: null,
        limit: null,
        reason: null,
        note: null,
      });
    }
  }

  async onSubmit({ value, valid }: { value: any, valid: boolean }) {
    if (this.customValid(value)) {
      const orderObj = this.getOrderObject(value);
      if (this.mode === 'create') {
        const result = await this._tradeService.createTradeOrder(orderObj);

        console.log('order created', result);

        if (result && result.id) {
          this._toasterService.pop('success', 'Order create success', '');
          this.orderForm.reset();
          this.initForm();
          this.resetForm();
        }
      } else {
        // value.id = this._currentBroker.id;

        // const result = await this._tradeService.updateBroker(value);

        // if (result && result.id) {
        //   this._toasterService.pop('success', 'Broker update success', '');
        //   this.brokerUpdated.emit(result);
        // }
      }
    }
  }

  autocompleListFormatter = (data: any): SafeHtml => {
    const html = `<span>${data.symbol} - ${data.name}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  async onShareChanged(event) {
    if (this.tradeSetting && this.tradeSetting.currentZone && this.tradeSetting.currentZone.id > 0) {
      this.latestTicker = await this._tickerService.getLatestByZone(event.id, this.tradeSetting.currentZone.id);

      if (this.latestTicker) {
        this.orderForm.patchValue({ tradingDate: this.latestTicker.tradingDate });
      } else {
        this.orderForm.patchValue({ tradingDate: null });
      }

      this.nextTicker = await this._tickerService.getNextByZone(event.id, this.tradeSetting.currentZone.id);
      this.openPeeked = false;
      this.closePeeked = false;
    }
  }

  async onShareKey(event) {
    if (typeof this.orderForm.value.share === 'string') {
      this.orderForm.patchValue({ tradingDate: null });
      this.resetForm();
    }
  }

  private getOrderObject(value) {
    console.log(this.tradeSetting);
    return {
      accountId: this.tradeSetting.currentAccount.id,
      direction: value.direction,
      orderType: this.orderType,
      shareId: value.share.id,
      latestPrice: this.latestTicker.close,
      latestTradingDate: this.latestTicker.tradingDate,
      tradingOrderDate: value.tradingDate,
      orderPrice: value.price,
      size: value.size,
      stop: value.stop,
      limit: value.limit,
      reason: value.reason,
      note: value.note,
    };
  }
  private resetForm() {
    this.latestTicker = null;
    this.nextTicker = null;
    this.openPeeked = false;
    this.closePeeked = false;
    this.orderType = null;
  }

  onPeekOpen() {
    this.openPeeked = true;
  }

  onPeekClose() {
    this.closePeeked = true;
  }

  onPriceChange(event) {
    this.setTradeDirection();
  }

  onDirectionChange(event) {
    this.setTradeDirection();
  }

  private setTradeDirection() {
    const share = this.orderForm.value['share'];
    let inputPrice = null;

    if (this.orderForm.value['price']) {
      inputPrice = parseFloat(this.orderForm.value['price']);
    }

    const direction = this.orderForm.value['direction'];

    if (share && this.latestTicker && inputPrice) {
      if (direction === 'Long') {
        if (inputPrice > this.latestTicker.close) {
          this.orderType = 'Stop';
        } else {
          this.orderType = 'Limit';
        }
      } else {
        if (inputPrice > this.latestTicker.close) {
          this.orderType = 'Limit';
        } else {
          this.orderType = 'Stop';
        }
      }
    }
  }

  private customValid(value) {
    let isValid = true;

    if (value.direction === 'Long') {
      if (value.stop && value.stop >= value.price) {
        isValid = false;
        this._toasterService.pop('error', 'Validation error', 'When Long, the Stop need to be lower than Order Price.');
      }
      if (value.limit && value.limit <= value.price) {
        isValid = false;
        this._toasterService.pop('error', 'Validation error', 'When Long, the Limit need to be higher than Order Price.');
      }
    } else {
      if (value.stop && value.stop <= value.price) {
        isValid = false;
        this._toasterService.pop('error', 'Validation error', 'When Short, the Stop need to be higher than Order Price.');
      }
      if (value.limit && value.limit >= value.price) {
        isValid = false;
        this._toasterService.pop('error', 'Validation error', 'When Short, the Limit need to be lower than Order Price.');
      }

    }

    return isValid;
  }

  cancelForm() {
    this.orderForm.reset();
    this.resetForm();
    this.initForm();
  }
}
