import { Component, OnInit, AfterViewInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import * as _ from 'underscore';
import { ISubscription } from 'rxjs/Subscription';
import { MessageService } from '../../services/message.service';
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
export class TradeOrderComponent implements OnInit, OnDestroy {
  private alive = true;
  private orders;
  private shares;
  private sortType = 'id';
  private selectedOrder;
  private currentPage = 1;
  private sortReverse = false;
  private tradeSetting;

  @Output() orderSelected = new EventEmitter<any>();

  constructor(private _tradeService: TradeService, private _shareService: ShareService,
    private _toasterService: ToasterService, public dialog: MdDialog,
    private _messageService: MessageService) {

    this._messageService.tradingOrder$
      .takeWhile(() => this.alive)
      .subscribe(state => {
        if (state.action === 'create') {
          const newOrder = state.data;
          newOrder.share = _.findWhere(this.shares, { id: newOrder.shareId });

          this.orders.push(newOrder);
        } else if (state.action === 'edit') {
          if (state.data.status === 'Open') {
            state.data.share = this.selectedOrder.share; // so donot have to populate share again
            ObjHelper.copyObject(state.data, this.selectedOrder);
          } else {
            this.orders = _.without(this.orders, _.findWhere(this.orders, { id: state.data.id }));
          }

        }
      });

  }

  async ngOnInit() {
    this.tradeSetting = await this._tradeService.getTradeSetting();
    this.shares = await this._shareService.getShareList();

    if (this.tradeSetting && this.tradeSetting.currentAccount) {
      this.loadOrderList();
    }
  }

  private async loadOrderList() {
    this.orders = await this._tradeService.getTradeOrderByZone(this.tradeSetting.currentAccount.id);

    _.each(this.orders, (o) => {
      (o as any).share = _.findWhere(this.shares, { id: (o as any).shareId });
    });
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
    this.orderSelected.emit(this.selectedOrder);
  }

  editOrder(orderId) {
    this.selectedOrder = _.findWhere(this.orders, { id: orderId });
    this.orderSelected.emit(this.selectedOrder);
  }

  async deleteOrder(orderId) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '450px',
      data: { hint: `Are sure you want to remove Order ${orderId}?` }
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result && result === 'Yes') {
        await this._tradeService.deleteTradeOrder(orderId);
        this.orders = _.without(this.orders, _.findWhere(this.orders, { id: orderId }));
        this._toasterService.pop('success', 'Order deleted.', '');
      }
    });
  }

  onOrderCreated(newOrder) {
    this.orders.push(newOrder);
  }

  onOrderUpdated(updatedOrder) {
    ObjHelper.copyObject(updatedOrder, this.selectedOrder);
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
