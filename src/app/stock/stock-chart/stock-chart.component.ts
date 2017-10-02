import { Component, OnInit, DoCheck, KeyValueDiffers, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { ISubscription } from 'rxjs/Subscription';
import { HttpModule, Http } from '@angular/http';
import { ObjHelper } from '../../utils/obj-helper';
import { Share, StateEvent } from '../../model/EntityDefinitions';
import { MessageService } from '../../services/message.service';
import { ShareService } from '../../services/share.service';
import { SharedService } from '../../services/shared.service';
import { TickerService } from '../../services/ticker.service';
import { TradeService } from '../../services/trade.service';
import { UtilityService } from '../../services/utility.service';

declare var $: any;
declare var Highcharts: any;

@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.scss']
})

export class StockChartComponent implements OnInit, DoCheck, OnDestroy, AfterViewInit {
  @ViewChild('chartTarget') chartTarget: ElementRef;

  private alive = true; // flag for event listeners
  private subscription: ISubscription;
  private currentShareId: number;
  private chart;
  private differ: any;
  private indicatorSettings;
  private options;
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
      'sma5': false,
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
    'height': 1330,
    'title': ''
  };

  constructor(private _logger: Logger, private _sharedService: SharedService, private _tradeService: TradeService,
    private _shareService: ShareService, private _tickerService: TickerService, private _utilityService: UtilityService,
    private _messageService: MessageService,
    private http: Http, private differs: KeyValueDiffers) {

    Highcharts.setOptions(this._sharedService.getSettings().chartTheme);
    this.differ = differs.find({}).create(null);

    this.subscription = this._messageService.currentState$
    .takeWhile(() => this.alive)
    .subscribe(state => {
      this.currentShareId = state.shareId;
      this.setting.title = state.data.name + ' - ' + state.data.description;
      this.displayChart(this.currentShareId);
    });

    const chartSwitch = localStorage.chartSwitch && JSON.parse(localStorage.chartSwitch);

    if (chartSwitch) {
      this.setting.switch = chartSwitch;
    }
  }

  ngOnInit() {
    this.indicatorSettings = this._sharedService.getSettings().indicatorSettings;
  }

  ngDoCheck() {
    const changeSwitch = this.differ.diff(this.setting.switch);

    if (changeSwitch) {
      localStorage.chartSwitch = JSON.stringify(this.setting.switch);
      if (this.currentShareId) {
        this.displayChart(this.currentShareId);
      }
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }

  public onPriceTypeChange(target) {
    if (this.currentShareId) {
      this.displayChart(this.currentShareId);
    }
  }

  public displayChart(shareId) {
    const indicatorString = this.getChartSettingInputString();
    const dateRange = this._shareService.getStockDateRange(null);
    this.initChartOption();

    this._tickerService.getTickers(shareId, dateRange.start, dateRange.end, indicatorString).then((data) => {
      this.tickers = data.tickerList;
      this.prepareData(data.tickerList);
      this.displayChartBase(data.indicators);
      this.displayChartTickers();

      this.options.series[0].data = this.volume;
      this.displayIndicators(data.indicators);
      this.chart = Highcharts.stockChart(this.chartTarget.nativeElement, this.options);
      this.chart.setSize(null, this.chart.userOptions.height);
    });
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
          if (!this.getChartOptionyAxisIndexbyId('RSI')) {
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
          }
            break;
          case 'adx':
            if (!this.getChartOptionyAxisIndexbyId('ADX')) {
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
            if (!this.getChartOptionyAxisIndexbyId('MACD')) {
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
            if (!this.getChartOptionyAxisIndexbyId('HEIKIN')) {
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
            if (!this.getChartOptionyAxisIndexbyId('STOCHASTIC')) {
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
            if (!this.getChartOptionyAxisIndexbyId('WILLIAM')) {
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
    this.setting.height = this.chartOptions.height;
    this.options = this.chartOptions;
  }

  private displayChartTickers() {
    const color = this.getColorStyle('closemain');
    if (this.setting.priceType === 'OCHL') {
      this.addChartIndicatorSeries_Main('candlestick', 'OCHL', this.ohlc, null, 0);
    } else {
      this.addChartIndicatorSeries_Main('line', 'Line', this.close, color.color, 0);
    }
  }

  private displayIndicators(indicators) {
    // tslint:disable-next-line:forin
    for (const k in indicators) {

      const setting = this.getIndicatorSettingByParameter(k);

      if (setting && (!setting.ownPane)) {
        this.displayIndicatorChart(k, indicators[k]);
      } else {
        this.displayIndicatorChartPane(k, indicators[k], setting);
      }
    }
  }

  private displayIndicatorChart(name, indicatorData) {
    const data = [];
    let color;
    for (let i = 0; i < indicatorData.length; i++) {
      data.push(
        [
          this.ohlc[i][0], // the date
          indicatorData[i]
        ]
      );
    }

    color = this.getIndicatorSettingByParameter(name).color;
    this.addChartIndicatorSeries_Main('line', name, data, color, 0);
  }

  private displayIndicator_RSI(name, indicatorData, color) {
    const data = [];
    let yAxisIndex;

    yAxisIndex = this.getChartOptionyAxisIndexbyId('RSI');

    for (let i = 0; i < indicatorData.length; i++) {
      data.push(
        [
          this.ohlc[i][0], // the date
          indicatorData[i]
        ]
      );
    }

    console.log('name: ', name);
    this.addChartIndicatorSeries_Main('line', name, data, color, yAxisIndex);
  }

  private displayIndicator_ADX(name, indicatorData, color) {
    const data = [];
    let yAxisIndex;

    yAxisIndex = this.getChartOptionyAxisIndexbyId('ADX');

    for (let i = 0; i < indicatorData.length; i++) {
      data.push(
        [
          this.ohlc[i][0], // the date
          indicatorData[i]
        ]
      );
    }

    this.addChartIndicatorSeries_Main('line', name, data, color, yAxisIndex);
  }

  private displayIndicator_MACD(name, indicatorData, color) {
    const data = [];
    let yAxisIndex;

    yAxisIndex = this.getChartOptionyAxisIndexbyId('MACD');
    for (let i = 0; i < indicatorData.length; i++) {
      data.push(
        [
          this.ohlc[i][0], // the date
          indicatorData[i]
        ]
      );
    }

    if (name.indexOf('hist') >= 0) {
      this.addChartIndicatorSeries_Main('column', name, data, color, yAxisIndex);
    } else {
      this.addChartIndicatorSeries_Main('line', name, data, color, yAxisIndex);
    }
  }

  private displayIndicator_HEIKIN(name, indicatorData) {
    let yAxisIndex;

    yAxisIndex = this.getChartOptionyAxisIndexbyId('HEIKIN');

    this.addChartIndicatorSeries_Main('candlestick', name, indicatorData, null, yAxisIndex);
  }

  private displayIndicator_STOCHASTIC(name, indicatorData, color) {
    const data = [];
    let yAxisIndex;

    yAxisIndex = this.getChartOptionyAxisIndexbyId('STOCHASTIC');

    for (let i = 0; i < indicatorData.length; i++) {
        data.push(
            [
                this.ohlc[i][0], // the date
                indicatorData[i]
            ]
        );
    }

    this.addChartIndicatorSeries_Main('line', name, data, color, yAxisIndex);
  }

  private displayIndicator_WILLIAM(name, indicatorData, color) {
    const data = [];
    let yAxisIndex;

    yAxisIndex = this.getChartOptionyAxisIndexbyId ('WILLIAM');
    for (let i = 0; i < indicatorData.length; i++) {
        data.push(
            [
                this.ohlc[i][0], // the date
                indicatorData[i]
            ]
        );
    }

    this.addChartIndicatorSeries_Main('line', name, data, color, yAxisIndex);
}


  private displayIndicatorChartPane(name, indicatorData, setting) {
    const indicatorName = name.split(',')[0];

    switch (indicatorName) {
      case 'rsi':
        const colorRsi = setting.colorRsi;
        this.displayIndicator_RSI(name, indicatorData, colorRsi);
        break;
      case 'adx':
        const colorAdx = setting.colorAdx;
        this.displayIndicator_ADX(name, indicatorData, colorAdx);
        break;
      case 'adx_di+':
        const colorPlus = setting.colorDiPlus;
        this.displayIndicator_ADX(name, indicatorData, colorPlus);
        break;
      case 'adx_di-':
        const colorMinus = setting.colorDiMinus;
        this.displayIndicator_ADX(name, indicatorData, colorMinus);
        break;
      case 'macd':
        const colorMacd = setting.colorMacd;
        this.displayIndicator_MACD(name, indicatorData, colorMacd);
        break;
      case 'signal_macd':
        const colorSignal = setting.colorSignal;
        this.displayIndicator_MACD(name, indicatorData, colorSignal);
        break;
      case 'hist_macd':
        const colorHist = setting.colorHist;
        this.displayIndicator_MACD(name, indicatorData, colorHist);
        break;
      case 'open_heikin':
        this.open_heikinList = indicatorData;
        break;
      case 'high_heikin':
        this.high_heikinList = indicatorData;
        break;
      case 'low_heikin':
        this.low_heikinList = indicatorData;
        break;
      case 'close_heikin':
        this.close_heikinList = indicatorData;
        const len = this.close_heikinList.length;
        for (let i = 0; i < len; i++) {
          this.heikinList.push([
            this.ohlc[i][0],
            this.open_heikinList[i],
            this.high_heikinList[i],
            this.low_heikinList[i],
            this.close_heikinList[i]
          ]);
        }
        this.displayIndicator_HEIKIN(name, this.heikinList);
        break;
      case 'stochastic':
          let kdColor;
          if (name.indexOf('_k') >= 0) {
              kdColor = setting.colorK;
          } else {
              kdColor = setting.colorD;
          }
          this.displayIndicator_STOCHASTIC(name, indicatorData, kdColor);
          break;
      case 'william':
          const colorW = setting.colorWilliam;
          this.displayIndicator_WILLIAM(name, indicatorData, colorW);
          break;
      default:
        break;
    }
  }


  private addChartIndicatorSeries_Main(type, name, data, color, yAxis) {
    this.chartOptions.series.push(
      {
        type: type,
        name: name,
        data: data,
        yAxis: yAxis,
        color: color,
        lineWidth: 1,
        cursor: 'pointer',
        events: {
          click: (event) => {
            const tick = parseInt(event.point.category, 0);

            const state = new StateEvent();
            state.eventType = 'Ticker-Select';
            state.shareId = this.currentShareId;
            const dateInt = ObjHelper.dateToInt(new Date(tick));
            state.data = { 'shareId': this.currentShareId,
              'tradingDate': dateInt };

            this._messageService.publishTickerSelect(state);
          }
        }
      });
  }

  private getChartOptionyAxisIndexbyId(id) {
    let index = null;

    for (let i = 0; i < this.chartOptions.yAxis.length; i++) {
      if (this.chartOptions.yAxis[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  private getIndicatorSettingByParameter(param) {
    let setting = null;

    const indicatorSettings = this.indicatorSettings;

    for (const k in indicatorSettings) {
      if (indicatorSettings[k].parameter &&
        param.indexOf(indicatorSettings[k].parameter) >= 0) {
        setting = indicatorSettings[k];
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

  ngAfterViewInit() {
  }
}
