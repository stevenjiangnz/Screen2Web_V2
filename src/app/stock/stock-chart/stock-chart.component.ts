import { Component, OnInit, DoCheck, KeyValueDiffers } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { HttpModule, Http } from '@angular/http';
import { ShareService } from '../../services/share.service';
import { SharedService } from '../../services/shared.service';
import { TickerService } from '../../services/ticker.service';
import { TradeService } from '../../services/trade.service';
import { UtilityService } from '../../services/utility.service';

@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.scss']
})

export class StockChartComponent implements OnInit, DoCheck {
  private chart;
  private indicatorSettings;
  private options: Object;
  private chartOptions; // used as stage
  private tickers = [];
  private ohlc;
  private close;
  private volume;
  private len;
  private heikinList = [];
  private open_heikinList = [];
  private high_heikinList = [];
  private low_heikinList = [];
  private close_heikinList = [];

  private groupingUnits = [[
    'week',                         // unit name
    [1]                             // allowed multiples
  ], [
    'month',
    [1, 2, 3, 4, 5, 6]
  ]];

  private setting = {
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
      'heikin': true,
      'stochastic': true,
      'rsi': true,
      'william': true
    },
    'priceType': 'OCHL',
    'startDate': null,
    'endDate': null,
    'maxDate': null,
    'flagType': null,
    'flags': null,
    'flagShareId': null,
    'height': 700,
    'title': ''
  };

  differ: any;

  constructor(private _logger: Logger, private _sharedService: SharedService, private _tradeService: TradeService,
    private _shareService: ShareService, private _tickerService: TickerService, private _utilityService: UtilityService,
    private http: Http, private differs: KeyValueDiffers) {
    this.differ = differs.find({}).create(null);
  }

  ngOnInit() {
    this.indicatorSettings = this._sharedService.getSettings().indicatorSettings;
  }

  ngDoCheck() {
    const changeSwitch = this.differ.diff(this.setting.switch);

    if (changeSwitch) {
      this.displayChart();
    }
  }

  public onPriceTypeChange(target) {
    this.displayChart();
  }

  public saveChartInstance(chartInstance) {
    this.chart = chartInstance;

    console.log('chart: ', this.chart);
  }

  public displayChart() {

    const indicatorString = this.getChartSettingInputString();
    const dateRange = this._shareService.getStockDateRange(null);

    this._tickerService.getTickers(1585, dateRange.start, dateRange.end, indicatorString).then((data) => {
      this.tickers = data.tickerList;
      this.prepareData(data.tickerList);
      this.displayChartBase(data.indicators);

      setTimeout(() => {
        this.displayChartTickers();
      }, 10);
    });
    // this.http.get('https://cdn.rawgit.com/gevgeny/angular2-highcharts/99c6324d/examples/aapl.json').subscribe(res => {
    //   this.options = {
    //     title: { text: 'AAPL Stock Price' },
    //     series: [{
    //       name: 'AAPL',
    //       data: res.json(),
    //       tooltip: {
    //         valueDecimals: 2
    //       }
    //     }]
    //   };
    // });
  }

  private initChartOption() {
    // init chart base option
    this.chartOptions = {
      rangeSelector: {
        selected: 1
      },
      title: {
        text: this.setting.title,
        align: 'center',
        x: 0,
        verticalAlign: 'top',
        y: 10
      },
      xAxis: {
        type: 'datetime',
        crosshair: {
          label: {
            enabled: true,
            padding: 8
          }
        },
        opposite: true
      },
      yAxis: [{
        labels: {
          align: 'right',
          x: -3
        },
        title: {
          text: 'OHLC'
        },
        height: 300,
        lineWidth: 1,
        top: 130,
        crosshair: {
          label: {
            enabled: false
            // padding: 8
          }
        }
      }, {
        labels: {
          align: 'right',
          x: -3
        },
        top: 340,
        height: 90,
        lineWidth: 1,
        offset: -6,
        opposite: false
      }],
      series: [{
        type: 'column',
        name: 'Volume',
        data: this.volume,
        yAxis: 1,
        dataGrouping: {
          units: this.groupingUnits
        },

        cursor: 'pointer'

      }
      ],
      navigator: {
        height: 10,
        top: 90
      },
      tooltip: {
        enabled: false
      },
      height: 470
    };

    // Add flags into the charts
    // addFlags();

    this.heikinList = [];
    this.open_heikinList = [];
    this.high_heikinList = [];
    this.low_heikinList = [];
    this.close_heikinList = [];
  }

  private prepareData(data) {
    this.len = this.tickers.length;
    this.ohlc = [];
    this.volume = [];
    this.close = [];

    for (let i = 0; i < this.len; i += 1) {
      this.ohlc.push([
        data[i].jsTicks, // the date
        data[i].open, // open
        data[i].high, // high
        data[i].low, // low
        data[i].close // close
      ]);

      this.volume.push([
        data[i].jsTicks, // the date
        data[i].volumn // the volume
      ]);

      this.close.push([
        data[i].jsTicks, // the date
        data[i].high
      ]);
    }
  }

  private displayChartBase(indicators) {
    this.initChartOption();

    let base = 450;
    const gap = 10;
    const bottom = 20;
    const plotColor = '#bbb';

    // tslint:disable-next-line:forin
    for (const k in indicators) {
      const setting = this.getIndicatorSettingByParameter(k);
      if (setting && setting.ownPane) {

        const indicatorName = setting.parameter.split(',')[0];
        switch (indicatorName) {
          case 'rsi':
            this.chartOptions.yAxis.push({
              id: 'RSI',
              title: {
                text: 'RSI'
              },
              min: 0,
              max: 100,
              plotLines: [{
                value: 30,
                color: plotColor,
                dashStyle: 'shortdash',
                width: 1
              }, {
                value: 70,
                color: plotColor,
                dashStyle: 'shortdash',
                width: 1
              }],
              lineWidth: 1,
              top: base + gap,
              height: setting.height
            });

            this.chartOptions.height = base + gap + setting.height;

            base = this.chartOptions.height;
            break;
          case 'adx':
            if (!this.getChartOptionyAxisbyId('ADX')) {
              this.chartOptions.yAxis.push({
                id: 'ADX',
                title: {
                  text: 'ADX'
                },
                lineWidth: 1,
                top: base + gap,
                height: setting.height
              });
              this.chartOptions.height = base + gap + setting.height;
              base = this.chartOptions.height;
            }
            break;
          case 'macd':
            if (!this.getChartOptionyAxisbyId('MACD')) {
              this.chartOptions.yAxis.push({
                id: 'MACD',
                title: {
                  text: 'MACD'
                },
                lineWidth: 1,
                top: base + gap,
                height: setting.height
              });
              this.chartOptions.height = base + gap + setting.height;
              base = this.chartOptions.height;
            }
            break;
          case 'heikin':
            if (!this.getChartOptionyAxisbyId('HEIKIN')) {
              this.chartOptions.yAxis.push({
                id: 'HEIKIN',
                title: {
                  text: 'HEIKIN'
                },
                lineWidth: 1,
                top: base + gap,
                height: setting.height
              });
              this.chartOptions.height = base + gap + setting.height;
              base = this.chartOptions.height;
            }
            break;
          case 'stochastic':
            if (!this.getChartOptionyAxisbyId('STOCHASTIC')) {
              this.chartOptions.yAxis.push({
                id: 'STOCHASTIC',
                title: {
                  text: 'STOCHASTIC'
                },
                lineWidth: 1,
                min: 0,
                max: 100,
                top: base + gap,
                height: setting.height,
                plotLines: [{
                  value: 20,
                  color: plotColor,
                  dashStyle: 'shortdash',
                  width: 1
                }, {
                  value: 80,
                  color: plotColor,
                  dashStyle: 'shortdash',
                  width: 1
                }]
              });
              this.chartOptions.height = base + gap + setting.height;
              base = this.chartOptions.height;
            }
            break;
          case 'william':
            if (!this.getChartOptionyAxisbyId('WILLIAM')) {
              this.chartOptions.yAxis.push({
                id: 'WILLIAM',
                title: {
                  text: 'WILLIAM'
                },
                lineWidth: 1,
                min: -100,
                max: 0,
                top: base + gap,
                height: setting.height,
                plotLines: [{
                  value: setting.threshold1,
                  color: plotColor,
                  dashStyle: 'shortdash',
                  width: 1
                }, {
                  value: setting.threshold2,
                  color: plotColor,
                  dashStyle: 'shortdash',
                  width: 1
                }]
              });
              this.chartOptions.height = base + gap + setting.height;
              base = this.chartOptions.height;
            }
            break;
          default:
            break;
        }
      }
    }

    this.chartOptions.height = this.chartOptions.height + bottom;

    this.options = this.chartOptions;
    // $scope.chartOptions = chartOptions;
  }

  private displayChartTickers() {
    const color = this.getColorStyle('ema20');
    if (this.setting.priceType === 'OCHL') {
      this.addChartIndicatorSeries('candlestick', 'OCHL', this.ohlc, null, 0);
    } else {
      this.addChartIndicatorSeries('line', 'Line', this.close, color, 0);
    }
  }

  private addChartIndicatorSeries(type, name, data, color, yAxis) {
    this.chart.addSeries(
      {
        type: type,
        name: name,
        data: data,
        yAxis: yAxis,
        color: color,
        lineWidth: 1,
        cursor: 'pointer',
        // events: {
        //     click: function (event) {
        //         var tick = parseInt(event.point.category)

        //         var intDate = utilService.dateToInt(new Date(tick));

        //         $scope.$emit('chartIndicatorSelected',
        //             {
        //                 'shareId': shareId,
        //                 'tradingDate' : intDate
        //             });
        //     }
        // }
      });
  }


  private getChartOptionyAxisbyId(id) {
    let y = null;

    for (let i = 0; i < this.chartOptions.yAxis.length; i++) {
      if (this.chartOptions.yAxis[i].id === id) {
        y = this.chartOptions.yAxis[i];
        break;
      }
    }
    return y;
  }

  private getIndicatorSettingByParameter(param) {
    let setting = null;

    const indicatorSettings = this.indicatorSettings;

    for (let k in indicatorSettings) {
      if (indicatorSettings[k].parameter &&
        param.indexOf(indicatorSettings[k].parameter) >= 0) {
        setting = indicatorSettings[k];
        break;
      }
    }

    return setting;

  }

  private getColorStyle(name: string) {
    let color = '#ffffff';
    const settings = this.indicatorSettings;

    for (const k in settings) {
      if (k === name) {
        color = settings[k].color;
        break;
      }
    }
    return { 'color': color };
  }

  private getChartSettingInputString() {
    let indicatorString = '';
    for (const k in this.setting.switch) {
      if (this.setting.switch[k]) {
        if (indicatorString.length === 0) {
          indicatorString = this.indicatorSettings[k].parameter;
        } else {
          indicatorString = indicatorString + '|' + this.indicatorSettings[k].parameter;
        }
      }
    }

    return indicatorString;
  }
}
