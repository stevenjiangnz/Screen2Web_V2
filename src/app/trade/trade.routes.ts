import { Routes } from '@angular/router';
import { TradePortalComponent } from './trade-portal.component';
import { ZoneComponent } from './zone/zone.component';
import { BrokerComponent } from './broker/broker.component';
import { AccountComponent } from './account/account.component';
import { TradeSettingComponent } from './trade-setting/trade-setting.component';
import { TradeSummaryComponent } from './trade-summary/trade-summary.component';

export const tradeRoutes: Routes = [
    {path: 'trade', component: TradePortalComponent,
        children: [
            {path: '', redirectTo: 'summary', pathMatch: 'full'},
            {path: 'zone', component: ZoneComponent},
            {path: 'broker', component: BrokerComponent},
            {path: 'account', component: AccountComponent},
            {path: 'setting', component: TradeSettingComponent},
            {path: 'summary', component: TradeSummaryComponent}
        ]},
];
