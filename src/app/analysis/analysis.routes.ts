import { Routes } from '@angular/router';
import { AnalysisComponent } from './analysis.component';
import { RuleComponent } from './rule/rule.component';
import { WatchComponent } from './watch/watch.component';

export const analysisRoutes: Routes = [
    {path: 'analysis', component: AnalysisComponent,
        children: [
            {path: '', redirectTo: 'rule', pathMatch: 'full'},
            {path: 'rule', component: RuleComponent},
            {path: 'watch', component: WatchComponent}
        ]},
];
