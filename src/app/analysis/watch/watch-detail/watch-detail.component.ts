import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { ObjHelper } from '../../../utils/obj-helper';
import * as _ from 'underscore';
import { AnalysisService } from '../../../services/analysis.service';
import { TradeService } from '../../../services/trade.service';
import { ShareService } from '../../../services/share.service';
import { DialogConfirmComponent } from '../../../component/dialog-confirm/dialog-confirm.component';
import { ToasterService } from 'angular2-toaster';

declare var $: any;

@Component({
  selector: 'app-watch-detail',
  templateUrl: './watch-detail.component.html',
  styleUrls: ['./watch-detail.component.scss']
})
export class WatchDetailComponent implements OnInit, AfterViewInit {
  private watchDetails;
  private watchId;
  private sortType = 'id';
  private selectedWatchDetail;
  private currentPage = 1;
  private sortReverse = false;
  private tradeSetting;
  private watchs;
  private currentWatch;

  constructor(private _analysisService: AnalysisService, private _toasterService: ToasterService, 
    private _shareService: ShareService, private _tradeService: TradeService, public dialog: MdDialog, private route: ActivatedRoute) {
      this.watchId =  this.route.snapshot.params.id;
    }

  async ngOnInit() {
    this.tradeSetting = await this._tradeService.getTradeSetting();
    this.watchs = await this._analysisService.getWatchList(this.tradeSetting.currentZone.id);
    this.currentWatch =  _.findWhere(this.watchs, {id: Number(this.watchId)});
    await this.loadWatchDetails(this.watchId);
    this.editWatchDetail(this.watchId);
  }

  ngAfterViewInit() {
  }

  private async loadWatchDetails(watchId) {
    this.watchDetails = await this._analysisService.getWatchDetailList(watchId);

    this.watchDetails.forEach(async (wd) => {
      wd.share = await this._shareService.getShareByID(wd.shareId);
        if (wd.share) {
          wd.symbol = wd.share.symbol;
          wd.name = wd.share.name;
          wd.sector = wd.share.sector;
        }
      });
  }

  onClickOrder(header) {
    this.sortType = header;
    this.sortReverse = !this.sortReverse;
  }

  async deleteWatchDetail(shareID) {
        await this._analysisService.removeShareFromWatch(this.watchId, shareID);
        this.loadWatchDetails(this.watchId);
        this._toasterService.pop('success', 'WatchDetail deleted.', '');
  }

  editWatchDetail(watchDetailId) {
    this.selectedWatchDetail = this.currentWatch;
  }

  async onWatchDetailUpdated(updatedWatchDetail) {
    this.loadWatchDetails(this.watchId);
  }
}
