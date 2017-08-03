import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocalStorageModule } from 'angular-2-local-storage';
import { MdButtonModule, MdCheckboxModule } from '@angular/material';
import { routing } from './app.routes';

import { AppComponent } from './app.component';
import { LoginCompComponent } from './login-comp/login-comp.component';
import { StockListComponent } from './stock/stock-list.component';
import { HomePortalComponent } from './home/home-portal.component';
import { TopNavComponent } from './component/top-nav/top-nav.component';
import { StockService } from './services/stock.service';
import { AuthService } from './services/auth.service';
import { ServiceAccessService } from './services/service-access.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginCompComponent,
    StockListComponent,
    HomePortalComponent,
    TopNavComponent
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
    LocalStorageModule.withConfig({
      prefix: 'screen2-app',
      storageType: 'localStorage'
    })
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [StockService,
    ServiceAccessService,
    AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
