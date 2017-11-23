import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { StorageKey } from '../../global/enums';
import { LocalStoreHelper } from '../../utils/local-store-helper';
import { ToasterService } from 'angular2-toaster';
import { TradeService } from '../../services/trade.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-zone-selector',
  templateUrl: './zone-selector.component.html',
  styleUrls: ['./zone-selector.component.scss']
})
export class ZoneSelectorComponent implements OnInit {
  private currentZone;
  private currentAccount;
  private timestamp;

  constructor(private router: Router, private _tradeService: TradeService, private _toasterService: ToasterService,
    private _messageService: MessageService) { }

  ngOnInit() {
    this.checkSetting();

    Observable.interval(1000).subscribe(() => {
      this.checkSetting();
    });
  }

  onSettingClick(event) {
    this.router.navigate(['/trade/setting']);
  }

  async onMoveToNextDay(event) {
    const result = await this._tradeService.getNextTradingDay(this.currentZone.id);

    if (result && result.id) {
      this._toasterService.pop('success', 'The trading date has been moved to next day', '');

      const newTradeSetting = {
        currentZone: result,
        currentAccount: this.currentAccount,
        timestamp: new Date().getTime(),
      };

      // update localStorage
      LocalStoreHelper.set(StorageKey.TRADE_SETTING, newTradeSetting);
      this.checkSetting();
      this._messageService.publishTradingDateChange(newTradeSetting);
    }
  }

  checkSetting() {
    const settingString = LocalStoreHelper.get(StorageKey.TRADE_SETTING);

    if (settingString) {
      const setting = JSON.parse(settingString);
      if (this.timestamp !== setting.timestamp) {
        this.currentZone = setting.currentZone;
        this.currentAccount = setting.currentAccount;
        this.timestamp = setting.timestamp;
      }
    }
  }
}
