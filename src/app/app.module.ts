import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCheckboxModule } from '@angular/material';
import { TreeModule } from 'angular-tree-component';
import { routing } from './app.routes';
import { Logger, Options, Level } from 'angular2-logger/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { AppComponent } from './app.component';
import { LoginCompComponent } from './login-comp/login-comp.component';
import { StockListComponent } from './stock/stock-list.component';
import { HomePortalComponent } from './home/home-portal.component';
import { TopNavComponent } from './component/top-nav/top-nav.component';
import { StockService } from './services/stock.service';
import { ShareService } from './services/share.service';
import { SharedService } from './services/shared.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { TradeService } from './services/trade.service';
import { TickerService } from './services/ticker.service';
import { ServiceAccessService } from './services/service-access.service';
import { MessageService } from './services/message.service';
import { UtilityService } from './services/utility.service';
import { StockNavComponent } from './stock/stock-nav/stock-nav.component';
import { StockChartComponent } from './stock/stock-chart/stock-chart.component';
import { StockDetailComponent } from './stock/stock-detail/stock-detail.component';
import { StockProfileComponent } from './stock/stock-profile/stock-profile.component';
import { StockIndicatorComponent } from './stock/stock-indicator/stock-indicator.component';

export declare var require: any;

const Highcharts = require('highcharts');

setChartOptions();

function setChartOptions() {
    // Load the fonts
    Highcharts.createElement('link', {
        href: '//fonts.googleapis.com/css?family=Unica+One',
        rel: 'stylesheet',
        type: 'text/css'
    }, null, document.getElementsByTagName('head')[0]);

    Highcharts.theme = {
        colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee',
            '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
        chart: {
            backgroundColor: {
                linearGradient: {x1: 0, y1: 0, x2: 1, y2: 1},
                stops: [
                    [0, '#2a2a2b'],
                    [1, '#3e3e40']
                ]
            },
            plotBorderColor: '#606063',
            lineWidth: 1
        },

        title: {
            style: {
                color: '#E0E0E3',
                textTransform: 'uppercase',
                fontSize: '20px'
            }
        },
        subtitle: {
            style: {
                color: '#E0E0E3',
                textTransform: 'uppercase',
                fontSize: '13px'
            }
        },
        xAxis: {
            gridLineColor: '#707073',
            labels: {
                style: {
                    color: '#E0E0E3',
                    fontSize: '13px'
                }
            },
            lineColor: '#707073',
            minorGridLineColor: '#505053',
            tickColor: '#707073',
            title: {
                style: {
                    color: '#A0A0A3',
                    fontSize: '13px'
                }
            }
        },
        yAxis: {
            gridLineColor: '#707073',
            labels: {
                style: {
                    color: '#E0E0E3',
                    fontSize: '13px'
                }
            },
            offset: 30,
            lineColor: '#707073',
            minorGridLineColor: '#505053',
            tickColor: '#707073',
            tickWidth: 1,
            title: {
                style: {
                    color: '#A0A0A3',
                    fontSize: '13px'
                }
            }
        },
        tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 1)',
            style: {
                color: '#000000',
                fontSize: '14px'
            },
            hideDelay: 0
        },
        plotOptions: {
            series: {
                dataLabels: {
                    color: '#B0B0B3'
                },
                marker: {
                    lineColor: '#333'
                }
            },
            boxplot: {
                fillColor: '#505053'
            },
            candlestick: {
                lineColor: 'white'
            },
            errorbar: {
                color: 'white'
            }
        },
        legend: {
            itemStyle: {
                color: '#E0E0E3'
            },
            itemHoverStyle: {
                color: '#FFF'
            },
            itemHiddenStyle: {
                color: '#606063'
            }
        },
        credits: {
            style: {
                color: '#666'
            },
            enabled: false
        },


        labels: {
            style: {
                color: '#707073'
            }
        },

        drilldown: {
            activeAxisLabelStyle: {
                color: '#F0F0F3'
            },
            activeDataLabelStyle: {
                color: '#F0F0F3'
            }
        },

        navigation: {
            buttonOptions: {
                symbolStroke: '#DDDDDD',
                theme: {
                    fill: '#505053'
                }
            }
        },
        // scroll charts
        rangeSelector: {
            buttonTheme: {
                fill: '#505053',
                stroke: '#000000',
                style: {
                    color: '#CCC'
                },
                states: {
                    hover: {
                        fill: '#707073',
                        stroke: '#000000',
                        style: {
                            color: 'white'
                        }
                    },
                    select: {
                        fill: '#000003',
                        stroke: '#000000',
                        style: {
                            color: 'white'
                        }
                    }
                }
            },
            inputBoxBorderColor: '#505053',
            inputStyle: {
                backgroundColor: '#333',
                color: 'silver'
            },
            labelStyle: {
                color: 'silver'
            }
        },

        navigator: {
            handles: {
                backgroundColor: '#666',
                borderColor: '#AAA'
            },
            outlineColor: '#CCC',
            maskFill: 'rgba(255,255,255,0.1)',
            series: {
                color: '#7798BF',
                lineColor: '#A6C7ED'
            },
            xAxis: {
                gridLineColor: '#505053'
            }
        },
        scrollbar: {
            barBackgroundColor: '#808083',
            barBorderColor: '#808083',
            buttonArrowColor: '#CCC',
            buttonBackgroundColor: '#606063',
            buttonBorderColor: '#606063',
            rifleColor: '#FFF',
            trackBackgroundColor: '#404043',
            trackBorderColor: '#404043'
        },
        // special colors for some of the
        legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
        background2: '#505053',
        dataLabelsColor: '#B0B0B3',
        textColor: '#C0C0C0',
        contrastTextColor: '#F0F0F3',
        maskColor: 'rgba(255,255,255,0.3)'
    };
}

export function highchartsFactory() {
    const hc = require('highcharts/highstock');
    // apply theme
    hc.setOptions(Highcharts.theme);
    const dd = require('highcharts/modules/exporting');
    dd(hc);
    return hc;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginCompComponent,
    StockListComponent,
    HomePortalComponent,
    TopNavComponent,
    StockNavComponent,
    StockChartComponent,
    StockDetailComponent,
    StockProfileComponent,
    StockIndicatorComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdCheckboxModule,
    routing,
    TreeModule,
    ToasterModule,
    ChartModule,
    NgbModule.forRoot(),
    SlimLoadingBarModule.forRoot()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [StockService,
    ShareService,
    SharedService,
    ServiceAccessService,
    AuthService,
    UserService,
    MessageService,
    ToasterService,
    TradeService,
    TickerService,
    UtilityService,
    { provide: Options, useValue: { store: false, level: Level.DEBUG } },
    Logger,
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
