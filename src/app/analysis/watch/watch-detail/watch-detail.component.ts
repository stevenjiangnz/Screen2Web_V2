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
    this.watchDetails = await this._analysisService.getWatchDetailList(this.watchId);

    this.watchDetails.forEach(async (wd) => {
      wd.share = await this._shareService.getShareByID(wd.shareId);
      if (wd.share) {
        wd.symbol = wd.share.symbol;
        wd.name = wd.share.name;
        wd.sector = wd.share.sector;
      }
    });
  }

  ngAfterViewInit() {
  }

  onClickOrder(header) {
    this.sortType = header;
    this.sortReverse = !this.sortReverse;
  }

  async deleteWatchDetail(watchDetailId) {

    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '450px',
      data: { hint: `Are sure you want to remove watchDetail ${watchDetailId}?`}
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      // if (result && result === 'Yes') {
      //   await this._analysisService.deleteWatchDetail(watchDetailId);
      //   this.watchDetails = _.without(this.watchDetails, _.findWhere(this.watchDetails, {id: watchDetailId}));
      //   this._toasterService.pop('success', 'WatchDetail deleted.', '');
      // }
    });
  }

  editWatchDetail(watchDetailId) {
    this.selectedWatchDetail = _.findWhere(this.watchDetails, {id: watchDetailId});
  }

  createWatchDetail() {
    this.selectedWatchDetail = null;
  }

  onWatchDetailCreated(newWatchDetail) {
    this.watchDetails.push(newWatchDetail);
  }

  onWatchDetailUpdated(updatedWatchDetail) {
    ObjHelper.copyObject(updatedWatchDetail, this.selectedWatchDetail);
  }
}
