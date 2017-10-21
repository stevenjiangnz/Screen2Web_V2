import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
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

  constructor(private fb: FormBuilder, private _toasterService: ToasterService, private _analysisService: TradeService) {
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
      startDate: [null, Validators.required],
      endDate: [null],
      status: 'active',
      note: '',
    });
  }

  public isChecked() {
    return true;
  }

  async onSubmit({ value, valid }: { value: any, valid: boolean }) {
    if (this.customValid(value)) {
      // const result = await this._analysisService.getCurrentZone();

      // if (result && result.id) {
      //   this._toasterService.pop('success', 'Zone create success', '');
      //   this.zoneForm.reset();
      // }

      // this.zoneCreated.emit(result);
    }
  }

  initForm() {
    if (this.mode === 'create') {
      this.zoneForm.setValue({
        name: '',
        description: '',
        startDate: null,
        endDate: null,
        status: 'active',
        note: '',
      });
    } else {
      this.zoneForm.setValue({
        name: this._currentZone.name,
        direction: this._currentZone.direction,
        description: this._currentZone.description,
        type: this._currentZone.type,
        assembly: this._currentZone.assembly,
        formula: this._currentZone.formula,
        note: this._currentZone.note,
        isSystem: this._currentZone.isSystem,
      });
    }
  }

  customValid(value) {
    let isValid = true;

    console.log(value);

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
