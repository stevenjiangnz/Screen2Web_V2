import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import * as _ from 'underscore';
import { TradeService } from '../../services/trade.service';
import { DialogConfirmComponent } from '../../component/dialog-confirm/dialog-confirm.component';
import { ToasterService } from 'angular2-toaster';
import { ObjHelper } from '../../utils/obj-helper';

declare var $: any;

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss']
})

export class ZoneComponent implements OnInit {
  private zones;
  private sortType = 'id';
  private selectedZone;
  private currentPage = 1;
  private sortReverse = false;

  constructor(private _tradeService: TradeService, private _toasterService: ToasterService, public dialog: MdDialog) { }

  async ngOnInit() {
    this.zones = await this._tradeService.getZoneList();

    console.log('zone list', this.zones);
  }

  onClickOrder(header) {
    this.sortType = header;
    this.sortReverse = !this.sortReverse;
  }

  dateToInt(d) {
    return ObjHelper.dateToInt( new Date(d));
  }
}
