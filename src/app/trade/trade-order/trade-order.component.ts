import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import * as _ from 'underscore';
import { TradeService } from '../../services/trade.service';
import { ShareService } from '../../services/share.service';
import { DialogConfirmComponent } from '../../component/dialog-confirm/dialog-confirm.component';
import { ToasterService } from 'angular2-toaster';
import { ObjHelper } from '../../utils/obj-helper';

@Component({
  selector: 'app-trade-order',
  templateUrl: './trade-order.component.html',
  styleUrls: ['./trade-order.component.scss']
})
export class TradeOrderComponent implements OnInit {
  private orders;
  private shares;
  private sortType = 'id';
  private selectedOrder;
  private currentPage = 1;
  private sortReverse = false;
  private tradeSetting;

  constructor(private _tradeService: TradeService, private _shareService: ShareService,
     private _toasterService: ToasterService, public dialog: MdDialog) { }

  async ngOnInit() {
    this.tradeSetting = await this._tradeService.getTradeSetting();
    this.shares = await this._shareService.getShareList();

    if (this.tradeSetting && this.tradeSetting.currentAccount) {
      this.orders = await this._tradeService.getTradeOrderByZone(this.tradeSetting.currentAccount.id);

      _.each(this.orders, (o) => {
        (o as any).share = _.findWhere(this.shares, {id: (o as any).shareId});
      });

      console.log(this.orders);
    }
  }

  onClickOrder(header) {
    this.sortType = header;
    this.sortReverse = !this.sortReverse;
  }

  dateToInt(d) {
    return ObjHelper.dateToInt(new Date(d));
  }

  createOrder() {
    this.selectedOrder = null;
  }

  editOrder(orderId) {
    this.selectedOrder = _.findWhere(this.orders, {id: orderId});
  }

  async deleteOrder(orderId) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '450px',
      data: { hint: `Are sure you want to remove rule ${orderId}?` }
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result && result === 'Yes') {
        // await this._tradeService.deleteOrder(orderId);
        // this.orders = _.without(this.orders, _.findWhere(this.orders, { id: orderId }));
        // this._toasterService.pop('success', 'Order deleted.', '');
      }
    });
  }

  onOrderCreated(newOrder) {
    this.orders.push(newOrder);
  }

  onOrderUpdated(updatedOrder) {
    ObjHelper.copyObject(updatedOrder, this.selectedOrder);
  }

}
