import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCheckboxModule } from '@angular/material';
import { routing } from './app.routes';

import { AppComponent } from './app.component';
import { LoginCompComponent } from './login-comp/login-comp.component';
import { TopNavComponent } from './home/top-nav.component';
import { StockListComponent } from './stock/stock-list.component';
import { HomePortalComponent } from './home/home-portal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginCompComponent,
    TopNavComponent,
    StockListComponent,
    HomePortalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdCheckboxModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
