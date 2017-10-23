import { Routes } from '@angular/router';
import { TradePortalComponent } from './trade-portal.component';
import { ZoneComponent } from './zone/zone.component';
import { BrokerComponent } from './broker/broker.component';

export const tradeRoutes: Routes = [
    {path: 'trade', component: TradePortalComponent,
        children: [
            {path: '', redirectTo: 'broker', pathMatch: 'full'},
            {path: 'zone', component: ZoneComponent},
            {path: 'broker', component: BrokerComponent}
        ]},
];
