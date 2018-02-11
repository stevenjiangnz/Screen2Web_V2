import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
import { ObjHelper } from '../../../utils/obj-helper';
import { ToasterService } from 'angular2-toaster';
import { TradeService } from '../../../services/trade.service';
import { AnalysisService } from '../../../services/analysis.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-scan-edit',
  templateUrl: './scan-edit.component.html',
  styleUrls: ['./scan-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ScanEditComponent implements OnInit {
  scanForm: FormGroup;
  private watchs;
  private rules;
  private tradeSetting;
  mode = 'create';

  private _currentScan: any;

  @Input() set currentScan(value: any) {
    this._currentScan = value;

    if (this._currentScan) {
      this.mode = 'edit';
    } else {
      this.mode = 'create';
    }

    this.initForm();
  }

  @Output() scanCreated = new EventEmitter<any>();
  @Output() scanUpdated = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private _toasterService: ToasterService,
    private _tradeService: TradeService, private _analysisService: AnalysisService) {
    this.createForm();
  }

  async ngOnInit() {
    this.tradeSetting = await this._tradeService.getTradeSetting();
    this.watchs = await this._analysisService.getWatchList(this.tradeSetting.currentZone.id);
    this.rules = await this._analysisService.getRuleList();
  }

  createForm() {
    this.scanForm = this.fb.group({
      name: ['', Validators.required],
      description: '',
      watch: [null, Validators.required],
      useRule: '',
      formula: '',
      rule: '',
      status: '',
    });
  }

  public isChecked() {
    return true;
  }

  async onSubmit({ value, valid }: { value: any, valid: boolean }) {
    if (this.customValid(value)) {
      const serviceObj = this.getServiceObject(value);
      if (this.mode === 'create') {
        const result = await this._analysisService.createDailyScan(serviceObj);

        if (result && result.id) {
          this._toasterService.pop('success', 'Scan create success', '');
          this.scanForm.reset();
          this.initForm();
          this.scanCreated.emit(result);
        }
      } else {
        serviceObj.id = this._currentScan.id;

        const result = await this._analysisService.uodateDailyScan(serviceObj);

        if (result && result.id) {
          this._toasterService.pop('success', 'Scan update success', '');
          this.scanUpdated.emit(result);
        }
      }
    }
  }

  initForm() {
    if (this.mode === 'create') {
      this.scanForm.setValue({
        name: '',
        description: '',
        watch: '',
        useRule: 'true',
        formula: '',
        rule: '',
        status: 'Active',
      });
    } else {
      const vm: any = this.getViewModel(this._currentScan);
      this.scanForm.setValue({
        name: vm.name,
        description: vm.description,
        watch: vm.watch,
        useRule: vm.useRule,
        formula: vm.formula,
        rule: vm.rule ? vm.rule : '',
        status: vm.status
      });
    }
  }

  private getServiceObject(value) {
    return {
      id: null,
      useRule: (value.useRule === 'true'),
      status: value.status,
      name: value.name,
      description: value.description,
      watchList: value.watch,
      watchListString: this.getWatchListString(value.watch),
      formula: value.formula,
      ruleId: value.rule.id,
      zoneId: this.tradeSetting.currentZone.id
    }
  }

  private getViewModel(obj) {
    return {
      useRule: obj.useRule.toString(),
      status: obj.status,
      name: obj.name,
      description: obj.description,
      watch: this.getWatchListArray(obj.watchListString),
      formula: obj.formula,
      rule: this.getRuleById(obj.ruleId),
    };
  }

  private getWatchListString(watchIdArray) {
    let wString = null;

    _.each(watchIdArray, function (w) {
      if (wString) {
        wString = wString + ',';
      }

      wString = wString + w;

    });

    return wString;
  }

  private getWatchListArray(watchIdString) {
    const strArr = watchIdString.split(',');
    const intArr = [];
    // tslint:disable-next-line:curly
    for (let i = 0; i < strArr.length; i++)
      // tslint:disable-next-line:radix
      intArr.push(parseInt(strArr[i]));

    return intArr;
  }

  private getRuleById(ruleId) {
    let ruleFound;
    this.rules.forEach(r => {
      if (r.id === ruleId) {
        ruleFound = r;
      }
    });
    return ruleFound;
  }

  customValid(value) {
    let isValid = true;
    if (value.useRule === 'true') {
      if (!value.rule) {
        isValid = false;
        this._toasterService.pop('error', 'Validation error', 'Rule is required');
      }
    } else {
      if (!value.formula) {
        isValid = false;
        this._toasterService.pop('error', 'Validation error', 'Formula is required');
      }
    }

    return isValid;
  }

  cancelForm() {
    this.scanForm.reset();
    this.initForm();
  }

}
