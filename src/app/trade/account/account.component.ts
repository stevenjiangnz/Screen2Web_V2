import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import * as _ from 'underscore';
import { TradeService } from '../../services/trade.service';
import { DialogConfirmComponent } from '../../component/dialog-confirm/dialog-confirm.component';
import { ToasterService } from 'angular2-toaster';
import { ObjHelper } from '../../utils/obj-helper';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  private accounts;
  private brokers;
  private zones;
  private sortType = 'id';
  private selectedAccount;
  private currentPage = 1;
  private sortReverse = false;

  constructor(private _tradeService: TradeService, private _toasterService: ToasterService, public dialog: MdDialog) { }

  async ngOnInit() {
    this.accounts = await this._tradeService.getAccountList();

    this.boxAccountList();
  }

  onClickOrder(header) {
    this.sortType = header;
    this.sortReverse = !this.sortReverse;
  }

  dateToInt(d) {
    return ObjHelper.dateToInt(new Date(d));
  }

  createAccount() {
    this.selectedAccount = null;
  }

  editAccount(accountId) {
    this.selectedAccount = _.findWhere(this.accounts, {id: accountId});
  }

  async deleteAccount(accountId) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '450px',
      data: { hint: `Are sure you want to remove rule ${accountId}?` }
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result && result === 'Yes') {
        // await this._tradeService.deleteAccount(accountId);
        this.accounts = _.without(this.accounts, _.findWhere(this.accounts, { id: accountId }));
        this._toasterService.pop('success', 'Account deleted.', '');
      }
    });
  }

  onAccountCreated(newAccount) {
    this.accounts.push(newAccount);
  }

  onAccountUpdated(updatedAccount) {
    ObjHelper.copyObject(updatedAccount, this.selectedAccount);
  }

  async boxAccountList() {
    this.brokers = await this._tradeService.getBrokerList();
    this.zones = await this._tradeService.getZoneList();

    _.each(this.accounts, (acc) => {
      const broker = _.where(this.brokers, {id: (acc as any).brokerId});
      const zone = _.where(this.zones, {id: (acc as any).zoneId});

      if (broker && broker.length > 0) {
        (acc as any).broker = (broker[0] as any).name;
      }

      if (zone && zone.length > 0) {
        (acc as any).zone = (zone[0] as any).name;
      } else {
        (acc as any).zone = 'current';
      }

    });

    console.log(this.accounts);
  }
}
