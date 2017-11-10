import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
import { ObjHelper } from '../../utils/obj-helper';
import { ToasterService } from 'angular2-toaster';
import { TradeService } from '../../services/trade.service';
import { ShareService } from '../../services/share.service';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss']
})
export class OrderEditComponent implements OnInit {
  orderForm: FormGroup;

  private shares;
  private accounts;

  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, private _sanitizer: DomSanitizer, private _toasterService: ToasterService,
    private _tradeService: TradeService, private _shareService: ShareService) {

    this.createForm();
  }

  async ngOnInit() {
    this.shares = await this._shareService.getShareList();
  }

  createForm() {
    this.orderForm = this.fb.group({
      share: ['', Validators.required],
      tradingDate: ['', Validators.required]
    });
  }

  autocompleListFormatter = (data: any) : SafeHtml => {
    const html = `<span>${data.symbol} - ${data.name}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  onShareChanged(event) {
    console.log(event);
  }
}
