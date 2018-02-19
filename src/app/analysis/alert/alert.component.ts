import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { ObjHelper } from '../../utils/obj-helper';
import * as _ from 'underscore';
import { AnalysisService } from '../../services/analysis.service';
import { TradeService } from '../../services/trade.service';
import { ShareService } from '../../services/share.service';
import { DialogConfirmComponent } from '../../component/dialog-confirm/dialog-confirm.component';
import { ToasterService } from 'angular2-toaster';

declare var $: any;

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, AfterViewInit {
  private alerts;
  private sortType = 'id';
  private selectedAlert;
  private currentPage = 1;
  private sortReverse = false;
  private tradeSetting;
  private shares;

  constructor(private _analysisService: AnalysisService, private _toasterService: ToasterService, 
    public dialog: MdDialog, private _tradeService: TradeService, private _shareService: ShareService) { }

  async ngOnInit() {
    this.tradeSetting = await this._tradeService.getTradeSetting();
    this.shares = await this._shareService.getShareList();
    this.loadAlertList();
  }

  ngAfterViewInit() {
  }

  async loadAlertList() {
    this.alerts = await this._analysisService.getAlertList(this.tradeSetting.currentZone.id);
    _.each(this.alerts, (o) => {
      (o as any).share = _.findWhere(this.shares, { id: (o as any).shareId });
    });
  }

  onClickOrder(header) {
    this.sortType = header;
    this.sortReverse = !this.sortReverse;
  }

  async deleteAlert(alertId) {

    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '450px',
      data: { hint: `Are sure you want to remove alert ${alertId}?`}
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      // if (result && result === 'Yes') {
      //   await this._analysisService.deleteAlert(alertId);
      //   this.alerts = _.without(this.alerts, _.findWhere(this.alerts, {id: alertId}));
      //   this._toasterService.pop('success', 'Alert deleted.', '');
      // }
    });
  }

  editAlert(alertId) {
    this.selectedAlert = _.findWhere(this.alerts, {id: alertId});
  }

  createAlert() {
    this.selectedAlert = null;
  }

  onAlertCreated(newAlert) {
    this.alerts.push(newAlert);
  }

  onAlertUpdated(updatedAlert) {
    ObjHelper.copyObject(updatedAlert, this.selectedAlert);
  }
}
