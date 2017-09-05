import { Component, OnInit, DoCheck, KeyValueDiffers } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { HttpModule,Http } from '@angular/http';
import { ShareService } from '../../services/share.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.scss']
})
export class StockChartComponent implements OnInit, DoCheck {
  private indicatorSetting;
  private options: Object;

  private setting= {
    'shareId': null,
    'switch': {
        'ema20': true,
        'sma5': true,
        'sma10': true,
        'sma50': true,
        'sma200': true,
        'bb': true,
        'adx': true,
        'macd': true,
        'heikin':true,
        'stochastic': true,
        'rsi': true,
        'william': true
    },
    'priceType': "OCHL",
    'startDate': null,
    'endDate': null,
    'maxDate': null,
    'flagType':null,
    'flags': null,
    'flagShareId' : null,
    'height': 700,
    'title': ""
};
  differ: any;
  constructor(private _logger: Logger, private _sharedService: SharedService, private http: Http, private differs: KeyValueDiffers) {
  //   http.get('https://cdn.rawgit.com/gevgeny/angular2-highcharts/99c6324d/examples/aapl.json').subscribe(res => {
  //     this.options = {
  //         title : { text : 'AAPL Stock Price' },   
  //         series : [{
  //             name : 'AAPL', 
  //             data : res.json(), 
  //             tooltip: {
  //                 valueDecimals: 2 
  //             }
  //         }]
  //     };
  // });
  this.differ = differs.find({}).create(null);
  }

  ngOnInit() {
  }

  ngDoCheck() {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    var changes = this.differ.diff(this.setting.switch);
    
        if(changes) {
          console.log('change here...');
          // console.log('changes detected');
          // changes.forEachChangedItem(r => console.log('changed ', r.currentValue));
          // changes.forEachAddedItem(r => console.log('added ' + r.currentValue));
          // changes.forEachRemovedItem(r => console.log('removed ' + r.currentValue));
        } else {
          // console.log('nothing changed');
        }
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
