import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'underscore';
import { ToasterService } from 'angular2-toaster';
import { AnalysisService } from '../../../services/analysis.service';
import { ShareService } from '../../../services/share.service';
import { TradeService } from '../../../services/trade.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-alert-edit',
  templateUrl: './alert-edit.component.html',
  styleUrls: ['./alert-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AlertEditComponent implements OnInit {
  alertForm: FormGroup;
  mode: string;
  private alive = true;
  private shares;
  private tradeSetting;
  private myShare;

  private _currentAlert: any;

  @Input() set currentAlert(value: any) {
    this._currentAlert = value;

    if (this._currentAlert) {
      this.mode = 'edit';
    } else {
      this.mode = 'create';
    }

    this.initForm();
  }

  @Output() alertCreated = new EventEmitter<any>();

  @Output() alertUpdated = new EventEmitter<any>();

  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, private _toasterService: ToasterService, private _sanitizer: DomSanitizer, private _analysisService: AnalysisService, private _tradeService: TradeService, private _shareService: ShareService, ) {
    this.createForm();
  }

  async ngOnInit() {
    this.shares = await this._shareService.getShareList();
    this.tradeSetting = await this._tradeService.getTradeSetting();
  }

  createForm() {
    this.alertForm = this.fb.group({
      share: ['', Validators.required],
      message: '',
      formula: '',
      isActive: true
    });
  }

  public isChecked() {
    return true;
  }

  async onSubmit({ value, valid }: { value: any, valid: boolean }) {
    const alertObj = this.getAlertObject(value);

    if (this.mode === 'create') {
      const result = await this._analysisService.createAlert(alertObj);

      if (result && result.id) {
        this._toasterService.pop('success', 'Alert create success', '');
        this.alertForm.reset();
        this.initForm();

        result.share = _.findWhere(this.shares, {id: result.shareId});
        this.alertCreated.emit(result);
      }
    } else {
      value.id = this._currentAlert.id;

      const serviceObj = Object.assign({}, this._currentAlert);
      serviceObj.share = null;
      serviceObj.shareId = alertObj.shareId;
      serviceObj.message = alertObj.message;
      serviceObj.formula = alertObj.formula;
      serviceObj.isActive = alertObj.isActive;
      serviceObj.zoneId = alertObj.zoneId;

      const result = await this._analysisService.updateAlert(serviceObj);

      result.share = _.findWhere(this.shares, {id: result.shareId});

      if (result && result.id) {
        this._toasterService.pop('success', 'Alert update success', '');
        this.alertUpdated.emit(result);
      }
    }
  }

  private getAlertObject(value) {
    const obj = {
      shareId: value.share.id,
      message: value.message,
      formula: value.formula,
      isActive: value.isActive,
      zoneId:  this.tradeSetting.currentZone.id
    };

    return obj;
  }

  initForm() {
    if (this.mode === 'create') {
      this.alertForm.setValue({
        share: '',
        message: '',
        formula: '',
        isActive: true
      });
    } else {
      this.alertForm.setValue({
        share: this._currentAlert.share,
        message: this._currentAlert.message,
        formula: this._currentAlert.formula,
        isActive: this._currentAlert.isActive,
      });
    }
  }

  cancelForm() {
    this.alertForm.reset();
    this.initForm();
  }

  async onShareKey(event) {
    if (typeof this.alertForm.value.share === 'string') {
      this.alertForm.patchValue({ tradingDate: null });
      this.resetForm();
    }
  }

  autocompleListFormatter = (data: any): SafeHtml => {
    const html = `<span>${data.symbol} - ${data.name}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
  private resetForm() {
  }

  async onShareChanged(share) {
  }

}
