import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'underscore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
import { ObjHelper } from '../../../utils/obj-helper';
import { ToasterService } from 'angular2-toaster';
import { TradeService } from '../../../services/trade.service';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AccountEditComponent implements OnInit {
  accountForm: FormGroup;
  mode = 'create';

  private _currentAccount: any;
  private brokers;
  private zones;

  myOptions: INgxMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
  };

  // Initialized to specific date (09.10.2018)
  model: any = { date: { year: 2018, month: 10, day: 9 } };

  @Input() set currentAccount(value: any) {
    this._currentAccount = value;

    if (this._currentAccount) {
      this.mode = 'edit';
    } else {
      this.mode = 'create';
    }

    this.initForm();
    const fundAmountCtrl = this.accountForm.get('fundAmount');

    if (this.mode === 'edit') {
      fundAmountCtrl.disable();
    } else {
      fundAmountCtrl.enable();
    }
  }

  @Output() accountCreated = new EventEmitter<any>();
  @Output() accountUpdated = new EventEmitter<any>();
  @Output() fundTransfered = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private _toasterService: ToasterService,
    private _tradeService: TradeService) {
    this.createForm();
  }

  async ngOnInit() {
    const brokers = await this._tradeService.getBrokerList();
    const zones = await this._tradeService.getZoneList();

    this.brokers = _.filter(brokers, (b) => (b as any).isActive)
    this.zones = _.filter(zones, function (z) {
      return (z as any).status.toLowerCase() === 'active';
    });
  }

  createForm() {
    this.accountForm = this.fb.group({
      name: ['', Validators.required],
      zone: [null, Validators.required],
      broker: [null, Validators.required],
      description: '',
      fundAmount: [null, Validators.required],
      isTrackingAccount: false,
      status: 'Active'
    });
  }

  public isChecked() {
    return true;
  }

  async onSubmit({ value, valid }: { value: any, valid: boolean }) {
    if (this.customValid(value)) {
      if (this.mode === 'create') {
        const result = await this._tradeService.createAccount({
          availableFund: value.fundAmount,
          status: value.status,
          zoneId: value.zone.id,
          brokerId: value.broker.id,
          name: value.name,
          description: value.description,
          isTrackingAccount: value.isTrackingAccount,
        });

        if (result && result.id) {
          this._toasterService.pop('success', 'Account create success', '');
          this.accountForm.reset();
          this.initForm();
          this.accountCreated.emit(result);
        }
      } else {
        const result = await this._tradeService.updateAccount({
          id: this._currentAccount.id,
          status: value.status,
          zoneId: value.zone.id,
          brokerId: value.broker.id,
          name: value.name,
          description: value.description,
          isTrackingAccount: value.isTrackingAccount,
          owner: this._currentAccount.owner,
          createDate: this._currentAccount.createDate,
          createBy: this._currentAccount.createBy,
        });

        if (result && result.id) {
          this._toasterService.pop('success', 'Account update success', '');
          this.accountUpdated.emit(result);
        }
      }
    }
  }

  initForm() {
    if (this.mode === 'create') {
      this.accountForm.setValue({
        name: '',
        zone: null,
        broker: null,
        description: '',
        fundAmount: null,
        isTrackingAccount: false,
        status: 'Active'
      });
    } else {
      this.accountForm.setValue({
        name: this._currentAccount.name,
        zone: this.getZoneById(this._currentAccount.zoneId),
        broker: this.getBrokerById(this._currentAccount.brokerId),
        description: this._currentAccount.description,
        fundAmount: this._currentAccount.fundAmount,
        isTrackingAccount: false,
        status: 'Active'
      });
    }
  }

  customValid(value) {
    let isValid = true;

    return isValid;
  }

  private getObjectForSevice(value) {
    return {
      availableFund: value.fundAmount,
      status: value.status,
      zoneId: value.zone.id,
      brokerId: value.broker.id,
      name: value.name,
      description: value.description,
      isTrackingAccount: value.isTrackingAccount,
    };
  }

  cancelForm() {
    this.accountForm.reset();
    this.initForm();
  }

  private getZoneById(id) {
     return _.findWhere(this.zones, {id: id});
  }

  private getBrokerById(id) {
    return _.findWhere(this.brokers, {id: id});
 }

 private onFundTransfered() {
   this.fundTransfered.emit();
 }
}
