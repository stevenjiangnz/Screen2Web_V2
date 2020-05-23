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
  private tradeSettings;

  myOptions: INgxMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
  };

  model: any = { date: { year: 2018, month: 10, day: 9 } };

  @Output() searchSubmitted = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private _toasterService: ToasterService, private _tradeService: TradeService) {
    this.createForm();
  }

  // optional date changed callback
  onDateChanged(event: IMyDateModel): void {
    // date selected
  }

  async ngOnInit() {
    this.tradeSettings = await this._tradeService.getTradeSetting();
    this.initForm();
  }

  createForm() {
    this.searchForm = this.fb.group({
      tradeDateObj: [null, Validators.required],
    });
  }

  public isChecked() {
    return true;
  }

  async onSubmit({ value, valid }: { value: any, valid: boolean }) {
    console.log('about to submit submitted');
    this.searchSubmitted.emit({
      tradingDate: ObjHelper.dateToInt(ObjHelper.CalendarToDate(value.tradeDateObj.date))
    });
  }

  initForm() {
      const startDate = ObjHelper.intToDate(this.tradeSettings.currentZone.tradingDate);
      const startDateObj = {
        date: {
          year: startDate.getFullYear(),
          month: startDate.getMonth() + 1,
          day: startDate.getDate(),
        }
      };
      this.searchForm.setValue({
        tradeDateObj: startDateObj,
      });
      }

  cancelForm() {
    this.searchForm.reset();
    this.initForm();
  }

}
