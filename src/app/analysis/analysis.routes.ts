import { Routes } from '@angular/router';
import { AnalysisComponent } from './analysis.component';
import { RuleComponent } from './rule/rule.component';
import { WatchComponent } from './watch/watch.component';
import { WatchDetailComponent } from './watch/watch-detail/watch-detail.component';
import { ScanComponent } from './scan/scan.component';
import { AlertComponent } from './alert/alert.component';

export const analysisRoutes: Routes = [
    {path: 'analysis', component: AnalysisComponent,
        children: [
            {path: '', redirectTo: 'rule', pathMatch: 'full'},
            {path: 'rule', component: RuleComponent},
            {path: 'watch', component: WatchComponent},
            {path: 'alert', component: AlertComponent},
            {path: 'scan', component: ScanComponent},
            {path: 'watchdetail/:id', component: WatchDetailComponent},
        ]},
];
