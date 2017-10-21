import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
import { ObjHelper } from '../../../utils/obj-helper';
import { ToasterService } from 'angular2-toaster';
import { TradeService } from '../../../services/trade.service';

@Component({
  selector: 'app-zone-edit',
  templateUrl: './zone-edit.component.html',
  styleUrls: ['./zone-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ZoneEditComponent implements OnInit {
  zoneForm: FormGroup;
  mode = 'create';

  private _currentZone: any;

  myOptions: INgxMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
  };

  // Initialized to specific date (09.10.2018)
  model: any = { date: { year: 2018, month: 10, day: 9 } };

  @Input() set currentZone(value: any) {
    this._currentZone = value;

    if (this._currentZone) {
      this.mode = 'edit';
    } else {
      this.mode = 'create';
    }

    this.initForm();
  }

  @Output() zoneCreated = new EventEmitter<any>();

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
    this.zoneForm = this.fb.group({
      name: ['', Validators.required],
      description: '',
      startDateObj: [null, Validators.required],
      endDateObj: [null],
      status: 'active',
      note: '',
    });
  }

  public isChecked() {
    return true;
  }

  async onSubmit({ value, valid }: { value: any, valid: boolean }) {
    if (this.customValid(value)) {
      value.startDate = new Date(value.startDateObj.jsdate).toISOString();

      if (value.endDateObj) {
        value.endDate = new Date(value.endDateObj.jsdate).toISOString();
      }

      if (this.mode === 'create') {
        value.tradingDate = ObjHelper.dateToInt(new Date(new Date(value.startDateObj.jsdate).toISOString()));
        const result = await this._tradeService.createZone(value);

        if (result && result.id) {
          this._toasterService.pop('success', 'Zone create success', '');
          this.zoneForm.reset();
          this.initForm();
          this.zoneCreated.emit(result);
        }
      }
    }
  }

  initForm() {
    if (this.mode === 'create') {
      this.zoneForm.setValue({
        name: '',
        description: '',
        startDateObj: null,
        endDateObj: null,
        status: 'active',
        note: '',
      });
    } else {
      console.log('about to set value', this._currentZone);
      const startDate = new Date(this._currentZone.startDate);
      const startDateObj = {date: {
        year: startDate.getFullYear(),
        month: startDate.getMonth() + 1,
        day: startDate.getDate(),
      }};

      let endDateObj = null;
      if (this._currentZone.endDate) {
        const endDate = new Date(this._currentZone.endDate);
        endDateObj = {date: {
          year: endDate.getFullYear(),
          month: endDate.getMonth() + 1,
          day: endDate.getDate(),
        }};
      }

      this.zoneForm.setValue({
        name: this._currentZone.name,
        description: this._currentZone.description,
        startDateObj: startDateObj,
        endDateObj: endDateObj,
        status: this._currentZone.status,
        note: this._currentZone.note,
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
    this.zoneForm.reset();
    this.initForm();
  }

}
