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
import { StorageKey } from '../../global/enums';
import { LocalStoreHelper } from '../../utils/local-store-helper';

@Component({
  selector: 'app-trade-profile',
  templateUrl: './trade-profile.component.html',
  styleUrls: ['./trade-profile.component.scss']
})
export class TradeProfileComponent implements OnInit, OnDestroy {
  private accountSummary;
  private shares;
  private sortType = 'id';
  private selectedProfile;
  private currentPage = 1;
  private sortReverse = true;
  private tradeSetting;
  private loadSize = '100';

  constructor(private _tradeService: TradeService, private _shareService: ShareService,
    private _toasterService: ToasterService, public dialog: MdDialog,
    private _messageService: MessageService) {
    const sizeSaved = LocalStoreHelper.get(StorageKey.JOURNEY_LOAD_SIZE);

    if (sizeSaved) {
      this.loadSize = sizeSaved;
    }
  }

  async ngOnInit() {
    this.tradeSetting = await this._tradeService.getTradeSetting();
    this.shares = await this._shareService.getShareList();

    if (this.tradeSetting && this.tradeSetting.currentAccount) {
      this.loadAccountSummary();
    }
  }

  private async loadAccountSummary() {
    this.accountSummary = await this._tradeService.getAccountSummary(this.tradeSetting.currentAccount.id);

    console.log(this.accountSummary);
    // _.each(this.profiles, (o) => {
    //   (o as any).share = _.findWhere(this.shares, { id: (o as any).shareId });
    // });
  }

  onClickOrder(header) {
    this.sortType = header;
    this.sortReverse = !this.sortReverse;
  }

  dateToInt(d) {
    return ObjHelper.dateToInt(new Date(d));
  }

  onSizeChange(data) {
    this.loadSize = data;
    LocalStoreHelper.set(StorageKey.JOURNEY_LOAD_SIZE, data);

    this.loadAccountSummary();
  }

  editProfile(profile) {
    this.selectedProfile = profile;
  }

  onProfileUpdated(updatedProfile) {
    this.loadAccountSummary();
  }
  ngOnDestroy() {
  }
}
