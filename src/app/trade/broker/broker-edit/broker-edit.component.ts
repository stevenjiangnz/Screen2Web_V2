import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
import { ObjHelper } from '../../../utils/obj-helper';
import { ToasterService } from 'angular2-toaster';
import { TradeService } from '../../../services/trade.service';

@Component({
  selector: 'app-broker-edit',
  templateUrl: './broker-edit.component.html',
  styleUrls: ['./broker-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class BrokerEditComponent implements OnInit {
  brokerForm: FormGroup;
  mode = 'create';

  private _currentBroker: any;

  myOptions: INgxMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
  };

  // Initialized to specific date (09.10.2018)
  model: any = { date: { year: 2018, month: 10, day: 9 } };

  @Input() set currentBroker(value: any) {
    this._currentBroker = value;

    if (this._currentBroker) {
      this.mode = 'edit';
    } else {
      this.mode = 'create';
    }

    this.initForm();
  }

  @Output() brokerCreated = new EventEmitter<any>();
  @Output() brokerUpdated = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private _toasterService: ToasterService, private _tradeService: TradeService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.brokerForm = this.fb.group({
      name: ['', Validators.required],
      description: '',
      minFee: [null, Validators.required],
      feeRate: [null, Validators.required],
      shortable: true,
      isActive: true,
    });
  }

  public isChecked() {
    return true;
  }

  async onSubmit({ value, valid }: { value: any, valid: boolean }) {
    if (this.customValid(value)) {
      if (this.mode === 'create') {
        const result = await this._tradeService.createBroker(value);

        if (result && result.id) {
          this._toasterService.pop('success', 'Broker create success', '');
          this.brokerForm.reset();
          this.initForm();
          this.brokerCreated.emit(result);
        }
      } else {
        value.id = this._currentBroker.id;

        const result = await this._tradeService.updateBroker(value);

        if (result && result.id) {
          this._toasterService.pop('success', 'Broker update success', '');
          this.brokerUpdated.emit(result);
        }
      }
    }
  }

  initForm() {
    if (this.mode === 'create') {
      this.brokerForm.setValue({
        name: '',
        description: '',
        minFee: null,
        feeRate: null,
        shortable: true,
        isActive: true,
      });
    } else {
      this.brokerForm.setValue({
        name: this._currentBroker.name,
        description: this._currentBroker.description,
        minFee: this._currentBroker.minFee,
        feeRate: this._currentBroker.feeRate,
        shortable: this._currentBroker.shortable,
        isActive: this._currentBroker.isActive,
      });
    }
  }

  customValid(value) {
    let isValid = true;

    if (value.endDate) {
      if (value.endDate.epoc < value.startDate.epoc) {
        isValid = false;
        this._toasterService.pop('error', 'Validation error', 'Start Date can not be later than End Date.');
      }
    }

    return isValid;
  }

  cancelForm() {
    this.brokerForm.reset();
    this.initForm();
  }

}
