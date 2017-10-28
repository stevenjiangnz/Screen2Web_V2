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
  }

  @Output() accountCreated = new EventEmitter<any>();
  @Output() accountUpdated = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private _toasterService: ToasterService, private _tradeService: TradeService) {
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
        console.log(value);
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
        value.id = this._currentAccount.id;

        // const result = await this._tradeService.updateAccount(value);

        // if (result && result.id) {
        //   this._toasterService.pop('success', 'Account update success', '');
        //   this.accountUpdated.emit(result);
        // }
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
        description: this._currentAccount.description,
        minFee: this._currentAccount.minFee,
        feeRate: this._currentAccount.feeRate,
        shortable: this._currentAccount.shortable,
        // isActive: this._currentAccount.isActive,
      });
    }
  }

  customValid(value) {
    let isValid = true;

    // if (value.endDate) {
    //   if (value.endDate.epoc < value.startDate.epoc) {
    //     isValid = false;
    //     this._toasterService.pop('error', 'Validation error', 'Start Date can not be later than End Date.');
    //   }
    // }

    return isValid;
  }

  cancelForm() {
    this.accountForm.reset();
    this.initForm();
  }

}
