import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Share } from 'app/model/EntityDefinitions';

@Component({
  selector: 'app-stock-profile',
  templateUrl: './stock-profile.component.html',
  styleUrls: ['./stock-profile.component.scss']
})

export class StockProfileComponent implements OnInit, OnChanges {
  @Input() share: Share;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(...args: any[]) {
    console.log('input: ', this.share);
  }
}
