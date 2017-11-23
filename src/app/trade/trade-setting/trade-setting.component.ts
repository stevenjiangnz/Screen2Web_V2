import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'underscore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
import { ObjHelper } from '../../utils/obj-helper';
import { ToasterService } from 'angular2-toaster';
import { TradeService } from '../../services/trade.service';
import { MessageService } from '../../services/message.service';
import { StorageKey } from '../../global/enums';
import { LocalStoreHelper } from '../../utils/local-store-helper';

@Component({
  selector: 'app-trade-setting',
  templateUrl: './trade-setting.component.html',
  styleUrls: ['./trade-setting.component.scss']
})

export class TradeSettingComponent implements OnInit {
  private zones;
  private accounts;
  private currentZone;
  private currentAccount;
  settingForm: FormGroup;
  mode = 'create';

  constructor(private fb: FormBuilder, private _toasterService: ToasterService,
    private _tradeService: TradeService, private _messageService: MessageService) {
    this.createForm();
  }

  async ngOnInit() {
    const zones = await this._tradeService.getZoneList();
    const accounts = await this._tradeService.getAccountList();

    this.zones = _.filter(zones, function (z) {
      return (z as any).status.toLowerCase() === 'active';
    });

    this.zones.unshift({
      id: -1,
      name: 'Current',
      description: null
    });

    this.accounts = _.filter(accounts, function (a) {
      return (a as any).status.toLowerCase() === 'active';
    });

    const ts = await this._tradeService.getTradeSetting();
    this.currentAccount = ts.currentAccount;
    this.currentZone = ts.currentZone;

    this.initForm();
  }

  createForm() {
    this.settingForm = this.fb.group({
      zone: [null, Validators.required],
      account: [null, Validators.required]
    });
  }

  async onSubmit({ value, valid }: { value: any, valid: boolean }) {
    const tradeSetting = {
      currentZone: value.zone,
      currentAccount: value.account,
      timestamp: new Date().getTime(),
    };

    LocalStoreHelper.set(StorageKey.TRADE_SETTING, tradeSetting);
    this._toasterService.pop('success', 'Set current zone success', '');
    this.currentAccount = value.account;
    this.currentZone = value.zone;

    this._messageService.publishTradeSettingChange(tradeSetting);
  }

  initForm() {
    this.settingForm.setValue({
      zone: _.findWhere(this.zones, { id: this.currentZone.id }),
      account: _.findWhere(this.accounts, { id: this.currentAccount.id }),
    });
  }

  cancelForm() {
    this.settingForm.reset();
    this.initForm();
  }

  getZoneOptionString(z) {
    if (z.description) {
      return `${z.name} (${z.id}) - ${z.description}`;
    } else {
      return `${z.name} (${z.id})`;
    }
  }

  getAccountOptionString(a) {
    if (a.description) {
      return `${a.name} (${a.id}) - ${a.description}`;
    } else {
      return `${a.name} (${a.id})`;
    }
  }
}
