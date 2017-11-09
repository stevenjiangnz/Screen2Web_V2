import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
import { ObjHelper } from '../../utils/obj-helper';
import { ToasterService } from 'angular2-toaster';
import { TradeService } from '../../services/trade.service';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss']
})
export class OrderEditComponent implements OnInit {
  orderForm: FormGroup;

  constructor(private fb: FormBuilder, private _toasterService: ToasterService, private _tradeService: TradeService) { 
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.orderForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

}
