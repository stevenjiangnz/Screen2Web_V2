import { Component, OnInit } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { HttpModule,Http } from '@angular/http';
import { ShareService } from '../../services/share.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.scss']
})
export class StockChartComponent implements OnInit {
  private indicatorSetting;
  private options: Object;

  constructor(private _logger: Logger, private _sharedService: SharedService, private http: Http) {
    http.get('https://cdn.rawgit.com/gevgeny/angular2-highcharts/99c6324d/examples/aapl.json').subscribe(res => {
      this.options = {
          title : { text : 'AAPL Stock Price' },   
          series : [{
              name : 'AAPL', 
              data : res.json(), 
              tooltip: {
                  valueDecimals: 2 
              }
          }]
      };
  });
  }

  ngOnInit() {
  }

  private getColorStyle(name: string) {
    let color = '#ffffff';
    const settings = this._sharedService.getSettings().indicatorSettings;

    for (const k in settings) {
      if (k === name) {
        color = settings[k].color;
        break;
      }
    }
    return { 'color': color };
  }
}
