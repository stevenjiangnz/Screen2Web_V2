import { Routes } from '@angular/router';
import { TradePortalComponent } from './trade-portal.component';
import { ZoneComponent } from './zone/zone.component';

export const tradeRoutes: Routes = [
    {path: 'trade', component: TradePortalComponent,
        children: [
            {path: '', redirectTo: 'zone', pathMatch: 'full'},
            {path: 'zone', component: ZoneComponent}
        ]},
];
