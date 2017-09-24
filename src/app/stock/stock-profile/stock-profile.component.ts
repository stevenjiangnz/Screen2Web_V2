import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Share } from 'app/model/EntityDefinitions';
import { ShareService } from '../../services/share.service';

@Component({
  selector: 'app-stock-profile',
  templateUrl: './stock-profile.component.html',
  styleUrls: ['./stock-profile.component.scss']
})

export class StockProfileComponent implements OnInit, OnChanges {
  @Input() share: Share;
  private shareInfo: any = {};

  constructor(private _shareService: ShareService) {
  }

  ngOnInit() {
  }

  async ngOnChanges(...args: any[]) {
    this.shareInfo = {};
    this.shareInfo = await this._shareService.getStockInfo(this.share.id);
  }
}
