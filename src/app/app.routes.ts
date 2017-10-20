import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { homeRoutes } from './home/home.routes';
import { stockRoutes } from './stock/stock.routes';
import { analysisRoutes } from './analysis/analysis.routes';
import { tradeRoutes } from './trade/trade.routes';

// Route Configuration
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  ...homeRoutes,
  ...stockRoutes,
  ...analysisRoutes,
  ...tradeRoutes,
];

// Deprecated provide
// export const APP_ROUTER_PROVIDERS = [
//   provideRouter(routes)
// ];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

