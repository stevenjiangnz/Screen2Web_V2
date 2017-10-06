import { Routes } from '@angular/router';
import { AnalysisComponent } from './analysis.component';
import { ZoneComponent } from './zone/zone.component';
import { RuleComponent } from './rule/rule.component';

export const analysisRoutes: Routes = [
    {path: 'analysis', component: AnalysisComponent,
        children: [
            {path: '', redirectTo: 'zone', pathMatch: 'full'},
            {path: 'zone', component: ZoneComponent},
            {path: 'rule', component: RuleComponent}
        ]},
];
