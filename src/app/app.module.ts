import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { MdButtonModule, MdCheckboxModule, MdTooltipModule, MdDialogModule } from '@angular/material';
import { TreeModule } from 'angular-tree-component';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { routing } from './app.routes';
import { Logger, Options, Level } from 'angular2-logger/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDialogModule } from 'ngx-dialog';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { AppComponent } from './app.component';
import { LoginCompComponent } from './login-comp/login-comp.component';
import { StockListComponent } from './stock/stock-list.component';
import { HomePortalComponent } from './home/home-portal.component';
import { TopNavComponent } from './component/top-nav/top-nav.component';
import { StockService } from './services/stock.service';
import { ShareService } from './services/share.service';
import { SharedService } from './services/shared.service';
import { AnalysisService } from './services/analysis.service';
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
import { RuleComponent } from './analysis/rule/rule.component';
import { RuleEditComponent } from './analysis/rule/rule-edit/rule-edit.component';
import { DialogConfirmComponent } from './component/dialog-confirm/dialog-confirm.component';
import { TradePortalComponent } from './trade/trade-portal.component';
import { ZoneComponent } from './trade/zone/zone.component';
import { ZoneEditComponent } from './trade/zone/zone-edit/zone-edit.component';
import { BrokerComponent } from './trade/broker/broker.component';
import { BrokerEditComponent } from './trade/broker/broker-edit/broker-edit.component';
import { AccountComponent } from './trade/account/account.component';
import { AccountEditComponent } from './trade/account/account-edit/account-edit.component';
import { FundTransferComponent } from './trade/account/fund-transfer/fund-transfer.component';
import { ZoneSelectorComponent } from './component/zone-selector/zone-selector.component';
import { TradeSettingComponent } from './trade/trade-setting/trade-setting.component';
import { TradeSummaryComponent } from './trade/trade-summary/trade-summary.component';
import { OrderEditComponent } from './trade/order-edit/order-edit.component';
import { TradeOrderComponent } from './trade/trade-order/trade-order.component';
import { TradeHistoryComponent } from './trade/trade-history/trade-history.component';
import { TradeTransactionComponent } from './trade/trade-transaction/trade-transaction.component';
import { TradePositionComponent } from './trade/trade-position/trade-position.component';
import { PositionEditComponent } from './trade/trade-position/position-edit/position-edit.component';
import { TradeProfileComponent } from './trade/trade-profile/trade-profile.component';
import { WatchComponent } from './analysis/watch/watch.component';

export declare var require: any;
declare var Highcharts: any;

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
    RuleComponent,
    RuleEditComponent,
    DialogConfirmComponent,
    TradePortalComponent,
    ZoneComponent,
    ZoneEditComponent,
    BrokerComponent,
    BrokerEditComponent,
    AccountComponent,
    AccountEditComponent,
    FundTransferComponent,
    ZoneSelectorComponent,
    TradeSettingComponent,
    TradeSummaryComponent,
    OrderEditComponent,
    TradeOrderComponent,
    TradeHistoryComponent,
    TradeTransactionComponent,
    TradePositionComponent,
    PositionEditComponent,
    TradeProfileComponent,
    WatchComponent,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdCheckboxModule,
    MdTooltipModule,
    MdDialogModule,
    routing,
    TreeModule,
    ToasterModule,
    NgbModule.forRoot(),
    SlimLoadingBarModule.forRoot(),
    OrderModule,
    NgxPaginationModule,
    NgxDialogModule.forRoot(),
    NgxMyDatePickerModule.forRoot(),
    NguiAutoCompleteModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [StockService,
    ShareService,
    SharedService,
    ServiceAccessService,
    AnalysisService,
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
  bootstrap: [AppComponent],
  entryComponents: [DialogConfirmComponent]
})
export class AppModule { }
