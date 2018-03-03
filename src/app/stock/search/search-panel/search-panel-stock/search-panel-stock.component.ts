import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
import { ObjHelper } from '../../../../utils/obj-helper';
import { ToasterService } from 'angular2-toaster';
import { TradeService } from '../../../../services/trade.service';

@Component({
  selector: 'app-search-panel-stock',
  templateUrl: './search-panel-stock.component.html',
  styleUrls: ['./search-panel-stock.component.scss']
})


export class SearchPanelStockComponent implements OnInit {
  searchForm: FormGroup;

  private _currentSearch: any;

  myOptions: INgxMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
  };

  // Initialized to specific date (09.10.2018)
  model: any = { date: { year: 2018, month: 10, day: 9 } };

  @Output() searchCreated = new EventEmitter<any>();
  @Output() searchUpdated = new EventEmitter<any>();

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
    this.searchForm = this.fb.group({
      startDateObj: [null, Validators.required],
    });
  }

  public isChecked() {
    return true;
  }

  async onSubmit({ value, valid }: { value: any, valid: boolean }) {
  }

  initForm() {
      this.searchForm.setValue({
        startDateObj: null,
      });
      }

      // this.searchForm.setValue({
      //   name: this._currentSearch.name,
      //   description: this._currentSearch.description,
      //   startDateObj: startDateObj,
      //   endDateObj: endDateObj,
      //   status: this._currentSearch.status,
      //   note: this._currentSearch.note,
      // });

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
    this.searchForm.reset();
    this.initForm();
  }

}
