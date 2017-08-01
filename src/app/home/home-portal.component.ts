import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { StockService } from '../services/stock.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home-portal',
  templateUrl: './home-portal.component.html',
  styleUrls: ['./home-portal.component.scss'],
  providers: [StockService,
  AuthService]
})
export class HomePortalComponent implements OnInit {
  public environmentName: string = environment.testProp;
  public stockList: Array<any>;

  constructor(private stockService: StockService, private authService: AuthService) {
    this.stockList = stockService.getStocks();
   }

  ngOnInit() {
    this.authService.login('', '').subscribe((res) => {
      console.log(res.json().token_type);
      // console.log(res.json().access_token);
    } );
  }
}
