import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import * as _ from 'underscore';
import { TradeService } from '../../services/trade.service';
import { DialogConfirmComponent } from '../../component/dialog-confirm/dialog-confirm.component';
import { ToasterService } from 'angular2-toaster';
import { ObjHelper } from '../../utils/obj-helper';

@Component({
  selector: 'app-broker',
  templateUrl: './broker.component.html',
  styleUrls: ['./broker.component.scss']
})
export class BrokerComponent implements OnInit {
  private brokers;
  private sortType = 'id';
  private selectedBroker;
  private currentPage = 1;
  private sortReverse = false;

  constructor(private _tradeService: TradeService, private _toasterService: ToasterService, public dialog: MdDialog) { }

  async ngOnInit() {
    this.brokers = await this._tradeService.getBrokerList();

    console.log(this.brokers);
  }

  onClickOrder(header) {
    this.sortType = header;
    this.sortReverse = !this.sortReverse;
  }

  dateToInt(d) {
    return ObjHelper.dateToInt(new Date(d));
  }

  createBroker() {
    this.selectedBroker = null;
  }

  editBroker(brokerId) {
    this.selectedBroker = _.findWhere(this.brokers, {id: brokerId});
  }

  async deleteBroker(brokerId) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '450px',
      data: { hint: `Are sure you want to remove rule ${brokerId}?` }
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result && result === 'Yes') {
        await this._tradeService.deleteBroker(brokerId);
        this.brokers = _.without(this.brokers, _.findWhere(this.brokers, { id: brokerId }));
        this._toasterService.pop('success', 'Broker deleted.', '');
      }
    });
  }

  onBrokerCreated(newBroker) {
    this.brokers.push(newBroker);
  }

  onBrokerUpdated(updatedBroker) {
    ObjHelper.copyObject(updatedBroker, this.selectedBroker);
  }


}
