import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ToasterService } from 'angular2-toaster';
import { AnalysisService } from '../../../../services/analysis.service';
import { TradeService } from '../../../../services/trade.service';
import { ShareService } from '../../../../services/share.service';

@Component({
  selector: 'app-watch-detail-edit',
  templateUrl: './watch-detail-edit.component.html',
  styleUrls: ['./watch-detail-edit.component.scss']
})
export class WatchDetailEditComponent implements OnInit {
  private myShare;
  private shares;

  watchForm: FormGroup;
  mode = 'create';
  private tradeSetting;

  private _currentWatch: any;

  @Input() set currentWatch(value: any) {
    this._currentWatch = value;

    if (this._currentWatch) {
      this.mode = 'edit';
    }

    this.initForm();
  }


  @Output() watchDetailUpdated = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private _toasterService: ToasterService,  private _sanitizer: DomSanitizer,
    private _analysisService: AnalysisService, private _tradeService: TradeService, private _shareService: ShareService) {
    this.createForm();
  }

  async ngOnInit() {
    this.tradeSetting = await this._tradeService.getTradeSetting();
    this.shares = await this._shareService.getShareList();
  }

  createForm() {
    this.watchForm = this.fb.group({
      share: ['', Validators.required]
    });
  }

  public isChecked() {
    return true;
  }

  async onSubmit({ value, valid }: { value: any, valid: boolean }) {
    await this._analysisService.addShareToWatch(this._currentWatch.id, this.myShare.id);

    this._toasterService.pop('success', 'Share has been added to Watch success', '');
    this.watchForm.reset();
    this.initForm();
    this.watchDetailUpdated.emit(null);
  }

  initForm() {
      this.watchForm.setValue({
        share: ''
      });
  }

  cancelForm() {
    this.watchForm.reset();
    this.initForm();
  }

  autocompleListFormatter = (data: any): SafeHtml => {
    const html = `<span>${data.symbol} - ${data.name}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  async onShareChanged(share) {
    // if (this.tradeSetting && this.tradeSetting.currentZone && this.tradeSetting.currentZone.id > 0) {
    //   this.latestTicker = await this._tickerService.getLatestByZone(share.id, this.tradeSetting.currentZone.id);

    //   if (this.mode === 'create') {
    //     if (this.latestTicker) {
    //       this.orderForm.patchValue({ tradingDate: this.latestTicker.tradingDate });
    //     } else {
    //       this.orderForm.patchValue({ tradingDate: null });
    //     }
    //   }

    //   this.nextTicker = await this._tickerService.getNextByZone(share.id, this.tradeSetting.currentZone.id);
    //   this.openPeeked = false;
    //   this.closePeeked = false;
    // }
  }

  async onShareKey(event) {
    // if (typeof this.orderForm.value.share === 'string') {
    //   this.orderForm.patchValue({ tradingDate: null });
    //   this.resetForm();
    // }
  }

}
