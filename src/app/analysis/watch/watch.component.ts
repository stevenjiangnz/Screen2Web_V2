import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { ObjHelper } from '../../utils/obj-helper';
import * as _ from 'underscore';
import { AnalysisService } from '../../services/analysis.service';
import { TradeService } from '../../services/trade.service';
import { DialogConfirmComponent } from '../../component/dialog-confirm/dialog-confirm.component';
import { ToasterService } from 'angular2-toaster';

declare var $: any;

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent implements OnInit, AfterViewInit {
  private watchs;
  private sortType = 'id';
  private selectedWatch;
  private currentPage = 1;
  private sortReverse = false;
  private tradeSetting;

  constructor(private _analysisService: AnalysisService, private _toasterService: ToasterService,  private _tradeService:
    TradeService, public dialog: MdDialog) { }

  async ngOnInit() {
    this.tradeSetting = await this._tradeService.getTradeSetting();
    this.watchs = await this._analysisService.getWatchList(this.tradeSetting.currentZone.id);

    console.log(this.watchs);
  }

  ngAfterViewInit() {
  }

  onClickOrder(header) {
    this.sortType = header;
    this.sortReverse = !this.sortReverse;
  }

  async deleteWatch(watchId) {

    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '450px',
      data: { hint: `Are sure you want to remove watch ${watchId}?`}
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result && result === 'Yes') {
        await this._analysisService.deleteWatch(watchId);
        this.watchs = _.without(this.watchs, _.findWhere(this.watchs, {id: watchId}));
        this._toasterService.pop('success', 'Watch deleted.', '');
      }
    });
  }

  editWatch(watchId) {
    this.selectedWatch = _.findWhere(this.watchs, {id: watchId});
  }

  createWatch() {
    this.selectedWatch = null;
  }

  onWatchCreated(newWatch) {
    this.watchs.push(newWatch);
  }

  onWatchUpdated(updatedWatch) {
    ObjHelper.copyObject(updatedWatch, this.selectedWatch);
  }
}
