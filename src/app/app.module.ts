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
// import { ChartModule } from 'angular2-highcharts';
// import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
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
import { AnalysisComponent } from './analysis/analysis.component';
import { ZoneComponent } from './analysis/zone/zone.component';
import { RuleComponent } from './analysis/rule/rule.component';

export declare var require: any;
declare var Highcharts: any;
// const Highcharts = require('highcharts');

setChartOptions();

function setChartOptions() {
    // Load the fonts
    Highcharts.createElement('link', {
        href: '//fonts.googleapis.com/css?family=Unica+One',
        rel: 'stylesheet',
        type: 'text/css'
    }, null, document.getElementsByTagName('head')[0]);

}

// export function highchartsFactory() {
//     const hc = require('highcharts/highstock');
//     // apply theme
//     hc.setOptions(Highcharts.theme);
//     const dd = require('highcharts/modules/exporting');
//     dd(hc);
//     return hc;
// }

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
    StockIndicatorComponent,
    AnalysisComponent,
    ZoneComponent,
    RuleComponent,
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
    // ChartModule,
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
    // {
    //   provide: HighchartsStatic,
    //   useFactory: highchartsFactory
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
