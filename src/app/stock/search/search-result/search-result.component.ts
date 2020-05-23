import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'underscore';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  private shares: any;
  private sortType = 'shareId';
  private currentPage = 1;
  private sortReverse = false;


  @Input() set shareList(value: any) {
    this.shares = value;
    this.postProcess();

    console.log('after process   ', this.shares);
  }
  constructor() { }

  ngOnInit() {
  }

  onClickOrder(header) {
    this.sortType = header;
    this.sortReverse = !this.sortReverse;
  }

  postProcess() {
    _.each(this.shares, function (ind: any) {
      ind.delt_Vol =  ((avg, vol) => {
        let deltVal = 0;
          if (avg !== 0) {
            deltVal = (vol / avg) * 100;
          }
          return deltVal;
      })(ind.vol_AVG10, ind.volumn);
      ind.delt_Adx = ind.adX_Plus - ind.adX_Minus;

      ind.flag_Heikin = 0;
      if (ind.heikin_Close > ind.heikin_Open) {
        ind.flag_Heikin = 1;
      }

      if (ind.heikin_Close < ind.heikin_Open) {
        ind.flag_Heikin = -1;
      }

      ind.delt_PriceSD = 0;
      if (ind.open !== 0) {
          ind.delt_PriceSD = ((ind.close - ind.open) / ind.open) * 100;
      }
    });
  }
}
