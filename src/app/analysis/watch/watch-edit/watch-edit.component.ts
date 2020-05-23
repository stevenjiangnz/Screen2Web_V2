import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { AnalysisService } from '../../../services/analysis.service';
import { TradeService } from '../../../services/trade.service';

@Component({
  selector: 'app-watch-edit',
  templateUrl: './watch-edit.component.html',
  styleUrls: ['./watch-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WatchEditComponent implements OnInit {
  watchForm: FormGroup;
  mode = 'create';
  private tradeSetting;

  private _currentWatch: any;

  @Input() set currentWatch(value: any) {
    this._currentWatch = value;

    if (this._currentWatch) {
      this.mode = 'edit';
    } else {
      this.mode = 'create';
    }
    this.initForm();
  }

  @Output() watchCreated = new EventEmitter<any>();

  @Output() watchUpdated = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private _toasterService: ToasterService, private _analysisService: AnalysisService, 
    private _tradeService: TradeService) {
    this.createForm();
  }

  async ngOnInit() {
    this.tradeSetting = await this._tradeService.getTradeSetting();
  }

  createForm() {
    this.watchForm = this.fb.group({
      name: ['', Validators.required],
      description: '',
      displayOrder: 1,
      isSystem: true,
      status: ''
    });
  }

  public isChecked() {
    return true;
  }

  async onSubmit({ value, valid }: { value: any, valid: boolean }) {
    if (this.tradeSetting && this.tradeSetting.currentZone) {
      value.zoneId = this.tradeSetting.currentZone.id;
    }

    if (this.mode === 'create') {
      const result = await this._analysisService.createWatch(value);

      if (result && result.id) {
        this._toasterService.pop('success', 'Watch create success', '');
        this.watchForm.reset();
        this.initForm();
        this.watchCreated.emit(result);
      }
    } else {
      value.id = this._currentWatch.id;

      const result = await this._analysisService.updateWatch(value);

      if (result && result.id) {
        this._toasterService.pop('success', 'Watch update success', '');
        this.watchUpdated.emit(result);
      }
    }
  }

  initForm() {
    if (this.mode === 'create') {
      this.watchForm.setValue({
        name: '',
        description: '',
        displayOrder: 1,
        isSystem: true,
        status: 'Active'
      });
    } else {
      this.watchForm.setValue({
        name: this._currentWatch.name,
        description: this._currentWatch.description,
        displayOrder: this._currentWatch.displayOrder,
        isSystem: this._currentWatch.isSystem,
        status: this._currentWatch.status,
      });
    }
  }

  cancelForm() {
    this.watchForm.reset();
    this.initForm();
  }
}
