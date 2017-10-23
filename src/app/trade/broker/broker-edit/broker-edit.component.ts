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

  // optional date changed callback
  onDateChanged(event: IMyDateModel): void {
    // date selected
  }

  ngOnInit() {
  }

  createForm() {
    this.brokerForm = this.fb.group({
      name: ['', Validators.required],
      description: '',
      minFee: 0,
      feeRate: 0,
      shortable: true,
    });
  }

  public isChecked() {
    return true;
  }

  async onSubmit({ value, valid }: { value: any, valid: boolean }) {
    if (this.customValid(value)) {
      console.log(value);
      value.startDate = ObjHelper.CalendarToDate(value.startDateObj.date).toISOString();

      if (value.endDateObj) {
        value.endDate = ObjHelper.CalendarToDate(value.endDateObj.date).toISOString();
      }

      if (this.mode === 'create') {
        value.tradingDate = ObjHelper.dateToInt(new Date(value.startDate));
        // const result = await this._tradeService.createBroker(value);

        // if (result && result.id) {
        //   this._toasterService.pop('success', 'Broker create success', '');
        //   this.brokerForm.reset();
        //   this.initForm();
        //   this.brokerCreated.emit(result);
        // }
      } else {
        console.log('about to submit update');

        value.id = this._currentBroker.id;
        value.tradingDate = this._currentBroker.tradingDate;

        // const result = await this._tradeService.updateBroker(value);

        // if (result && result.id) {
        //   this._toasterService.pop('success', 'Rule update success', '');
        //   this.brokerUpdated.emit(result);
        // }
      }
    }
  }

  initForm() {
    if (this.mode === 'create') {
      this.brokerForm.setValue({
        name: '',
        description: '',
        minFee: 0,
        feeRate: 0,
        shortable: true,
      });
    } else {
      const startDate = new Date(this._currentBroker.startDate);
      const startDateObj = {
        date: {
          year: startDate.getFullYear(),
          month: startDate.getMonth() + 1,
          day: startDate.getDate(),
        }
      };

      let endDateObj = null;
      if (this._currentBroker.endDate) {
        const endDate = new Date(this._currentBroker.endDate);
        endDateObj = {
          date: {
            year: endDate.getFullYear(),
            month: endDate.getMonth() + 1,
            day: endDate.getDate(),
          }
        };
      }

      this.brokerForm.setValue({
        name: this._currentBroker.name,
        description: this._currentBroker.description,
        startDateObj: startDateObj,
        endDateObj: endDateObj,
        status: this._currentBroker.status,
        note: this._currentBroker.note,
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
