import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { StockService } from '../services/stock.service';

@Component({
  selector: 'app-home-portal',
  templateUrl: './home-portal.component.html',
  styleUrls: ['./home-portal.component.scss'],
  providers: [StockService]
})
export class HomePortalComponent implements OnInit {
  public environmentName: string = environment.testProp;
  public stockList: Array<any>;

  constructor(private stockService: StockService) {
    this.stockList = stockService.getStocks();
   }

  ngOnInit() {
  }



}
