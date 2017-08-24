import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCheckboxModule } from '@angular/material';
import { TreeModule } from 'angular-tree-component';
import { routing } from './app.routes';

import { AppComponent } from './app.component';
import { LoginCompComponent } from './login-comp/login-comp.component';
import { StockListComponent } from './stock/stock-list.component';
import { HomePortalComponent } from './home/home-portal.component';
import { TopNavComponent } from './component/top-nav/top-nav.component';
import { StockService } from './services/stock.service';
import { ShareService } from './services/share.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { ServiceAccessService } from './services/service-access.service';
import { StockNavComponent } from './stock/stock-nav/stock-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginCompComponent,
    StockListComponent,
    HomePortalComponent,
    TopNavComponent,
    StockNavComponent
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
    TreeModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [StockService,
    ShareService,
    ServiceAccessService,
    AuthService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
