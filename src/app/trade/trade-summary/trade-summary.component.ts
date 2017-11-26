import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trade-summary',
  templateUrl: './trade-summary.component.html',
  styleUrls: ['./trade-summary.component.scss']
})
export class TradeSummaryComponent implements OnInit {
  private selectedOrder  = null;
  constructor() { }

  ngOnInit() {
  }

  onOrderSelected(event) {
    this.selectedOrder = event;
  }
}
