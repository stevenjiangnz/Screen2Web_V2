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
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss']
})
export class ScanComponent implements OnInit, AfterViewInit {
  private scans;
  private sortType = 'id';
  private selectedScan;
  private currentPage = 1;
  private sortReverse = false;
  private tradeSetting;

  constructor(private _analysisService: AnalysisService, private _toasterService: ToasterService,
     public dialog: MdDialog,  private _tradeService: TradeService) {

  }

  async ngOnInit() {
    this.tradeSetting = await this._tradeService.getTradeSetting();
    this.scans = await this._analysisService.getScanList(this.tradeSetting.currentZone.id);
  }

  ngAfterViewInit() {
  }

  onClickOrder(header) {
    this.sortType = header;
    this.sortReverse = !this.sortReverse;
  }

  async deleteScan(scanId) {

    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '450px',
      data: { hint: `Are sure you want to remove scan ${scanId}?`}
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result && result === 'Yes') {
        await this._analysisService.deleteDailyScan(scanId);
        this.scans = _.without(this.scans, _.findWhere(this.scans, {id: scanId}));
        this._toasterService.pop('success', 'scan deleted.', '');
      }
    });
  }

  editScan(scanId) {
    this.selectedScan = _.findWhere(this.scans, {id: scanId});
  }

  createScan() {
    this.selectedScan = null;
  }

  onScanCreated(newScan) {
    this.scans.push(newScan);
  }

  onScanUpdated(updatedScan) {
    ObjHelper.copyObject(updatedScan, this.selectedScan);
  }
}
