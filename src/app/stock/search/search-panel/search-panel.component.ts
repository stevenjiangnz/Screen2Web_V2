import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { ShareService } from '../../../services/share.service';
import { UtilityService } from '../../../services/utility.service';

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent implements OnInit {

  @Output() searchDone = new EventEmitter<any>();

  constructor(private _shareService: ShareService, private _toasterService: ToasterService, 
    private _utilityService: UtilityService ) { }

  ngOnInit() {
  }


  async stockSearchSubmitted(value) {
    this._utilityService.startProgressBar();
    const shareList = await this._shareService.searchShareList(value.tradingDate);
    this.searchDone.emit(shareList);
    this._utilityService.completeProgressBar();
  }
}
