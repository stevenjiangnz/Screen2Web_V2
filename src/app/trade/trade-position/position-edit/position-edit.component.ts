import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
import { ObjHelper } from '../../../utils/obj-helper';
import { ToasterService } from 'angular2-toaster';
import { TradeService } from '../../../services/trade.service';
import { TickerService } from '../../../services/ticker.service';

@Component({
  selector: 'app-position-edit',
  templateUrl: './position-edit.component.html',
  styleUrls: ['./position-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class PositionEditComponent implements OnInit {
  positionForm: FormGroup;
  private tradeSetting;
  private _currentPosition: any;
  private nextTicker;
  private openPeeked = false;
  private closePeeked = false;

  @Input() set currentPosition(value: any) {
    this._currentPosition = value;

    if (this._currentPosition) {
      this.initForm();
    }
  }

  @Output() positionUpdated = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private _toasterService: ToasterService, private _tradeService: TradeService,
    private _tickerService: TickerService) {
    this.createForm();
  }

  async ngOnInit() {
    this.tradeSetting = await this._tradeService.getTradeSetting();
  }

  createForm() {
    this.positionForm = this.fb.group({
      stop: null,
      limit: null,
    });
  }

  public isChecked() {
    return true;
  }

  async onSubmit({ value, valid }: { value: any, valid: boolean }) {
    value.id = this._currentPosition.id;
    this._currentPosition.stop = value.stop;
    this._currentPosition.limit = value.limit;

    const result = await this._tradeService.updatePosition(this._currentPosition);

    if (result && result.id) {
      this._toasterService.pop('success', 'Position update success', '');
      this.positionUpdated.emit(result);
    }
  }

  async initForm() {
    this.positionForm.setValue({
      stop: this._currentPosition.stop,
      limit: this._currentPosition.limit,
    });

    this.nextTicker = await this._tickerService.getNextByZone(this._currentPosition.shareId, this.tradeSetting.currentZone.id);
    this.openPeeked = false;
    this.closePeeked = false;
  }

  cancelForm() {
    this.positionForm.reset();
    this.initForm();
  }

  onPeekOpen() {
    this.openPeeked = true;
  }

  onPeekClose() {
    this.closePeeked = true;
  }
}
