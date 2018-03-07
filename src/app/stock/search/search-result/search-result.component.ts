import { Component, OnInit, Input } from '@angular/core';

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
    console.log('get search result: ', value);

    this.shares = value;
  }
  constructor() { }

  ngOnInit() {
  }

  onClickOrder(header) {
    this.sortType = header;
    this.sortReverse = !this.sortReverse;
  }
}
