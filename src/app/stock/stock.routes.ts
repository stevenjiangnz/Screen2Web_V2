import { Routes } from '@angular/router';
import { StockListComponent } from './stock-list.component';
import { SearchComponent } from './search/search.component';


export const stockRoutes: Routes = [
    {path: 'stock', component: StockListComponent},
    {path: 'search', component: SearchComponent}
];
