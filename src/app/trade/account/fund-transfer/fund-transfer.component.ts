import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'underscore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
import { ObjHelper } from '../../../utils/obj-helper';
import { ToasterService } from 'angular2-toaster';
import { TradeService } from '../../../services/trade.service';

@Component({
  selector: 'app-fund-transfer',
  templateUrl: './fund-transfer.component.html',
  styleUrls: ['./fund-transfer.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class FundTransferComponent implements OnInit {
  fundForm: FormGroup;
  mode = 'create';

  private _currentAccount: any;

  @Input() set currentAccount(value: any) {
    this._currentAccount = value;

    if (this._currentAccount) {
      this.initForm();
    }
  }

  @Output() fundTransfered = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private _toasterService: ToasterService, private _tradeService: TradeService) {
    this.createForm();
  }

  async ngOnInit() {
  }

  createForm() {
    this.fundForm = this.fb.group({
      fundAmount: [null, Validators.required],
      operation: 'deposit'
    });
  }

  async onSubmit({ value, valid }: { value: any, valid: boolean }) {
    if (this.mode === 'create') {
      const result = await this._tradeService.transferFund(this._currentAccount.id, value.operation, value.fundAmount );

      if (result && result.id) {
        this._toasterService.pop('success', 'Fund create success', '');
        this.fundForm.reset();
        this.initForm();
        this.fundTransfered.emit(result);
      }
    }
  }

  initForm() {
    if (this.mode === 'create') {
      this.fundForm.setValue({
        fundAmount: null,
        operation: 'deposit'
      });
    }
  }

  cancelForm() {
    this.fundForm.reset();
    this.initForm();
  }
}
