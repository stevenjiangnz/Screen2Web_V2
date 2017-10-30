import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { SharedService } from './shared.service';
import { BaseService } from './baseService';

import { ObjHelper } from '../utils/obj-helper';
import { Zone } from '../model/EntityDefinitions';

@Injectable()
export class TradeService extends BaseService {
  constructor(public http: Http, private _sharedService: SharedService) { 
    super(http);
  }

  getCurrentZone(): Zone {
    const zone = new Zone();
    zone.id = 0;
    zone.isCurrent = true;
    return zone;
  }

  public async getZoneList() {
    let zoneList = null;
    const opt = await super.getOptions();

    await this.http.get(this.baseUrl + '/zone', opt).toPromise().then((data) => {
      const resObject = data.json();
      zoneList = resObject;
    });
    return zoneList;
  }

  public async createZone(zone) {
    let newZone = null;
    const opt = await super.getOptions();

    await this.http.put(this.baseUrl + '/zone', JSON.stringify(zone), opt).toPromise().then((data) => {
      const resObject = data.json();
      newZone = resObject;
    });
    return newZone;
  }

  public async deleteZone(zoneId) {
    const opt = await super.getOptions();

    await this.http.delete(this.baseUrl + '/zone?id=' + zoneId, opt).toPromise();
  }

  public async updateZone(zone) {
    let updatedZone = null;
    const opt = await super.getOptions();

    await this.http.post(this.baseUrl + '/zone', JSON.stringify(zone), opt).toPromise().then((data) => {
      const resObject = data.json();
      updatedZone = resObject;
    });
    return updatedZone;
  }

  public async getBrokerList() {
    let brokerList = null;
    const opt = await super.getOptions();

    await this.http.get(this.baseUrl + '/broker', opt).toPromise().then((data) => {
      const resObject = data.json();
      brokerList = resObject;
    });
    return brokerList;
  }

  public async createBroker(broker) {
    let newBroker = null;
    const opt = await super.getOptions();

    await this.http.put(this.baseUrl + '/broker', JSON.stringify(broker), opt).toPromise().then((data) => {
      const resObject = data.json();
      newBroker = resObject;
    });
    return newBroker;
  }

  public async updateBroker(broker) {
    let updatedBroker = null;
    const opt = await super.getOptions();

    await this.http.post(this.baseUrl + '/broker', JSON.stringify(broker), opt).toPromise().then((data) => {
      const resObject = data.json();
      updatedBroker = resObject;
    });
    return updatedBroker;
  }

  public async deleteBroker(brokerId) {
    const opt = await super.getOptions();

    await this.http.delete(this.baseUrl + '/broker?id=' + brokerId, opt).toPromise();
  }


  public async getAccountList() {
    let accountList = null;
    const opt = await super.getOptions();

    await this.http.get(this.baseUrl + '/tradeaccount/getlistfull', opt).toPromise().then((data) => {
      const resObject = data.json();
      accountList = resObject;
    });
    return accountList;
  }

  public async createAccount(account) {
    let newAccount = null;
    const opt = await super.getOptions();

    await this.http.put(this.baseUrl + '/tradeaccount', JSON.stringify(account), opt).toPromise().then((data) => {
      const resObject = data.json();
      newAccount = resObject;
    });
    return newAccount;
  }

  public async updateAccount(account) {
    let updatedAccount = null;
    const opt = await super.getOptions();

    await this.http.post(this.baseUrl + '/tradeaccount', JSON.stringify(account), opt).toPromise().then((data) => {
      const resObject = data.json();
      updatedAccount = resObject;
    });
    return updatedAccount;
  }

  public async deleteAccount(accountId) {
    const opt = await super.getOptions();

    await this.http.delete(this.baseUrl + '/tradeaccount?id=' + accountId, opt).toPromise();
  }

  public async transferFund(accountId, operation, amount) {
    let updatedBalance = null;
    const opt = await super.getOptions();

    // tslint:disable-next-line:max-line-length
    await this.http.post(this.baseUrl + `/tradeaccount/transferfund?accountid=${accountId}&operation=${operation}&amount=${amount}`, null, opt).toPromise().then((data) => {
      const resObject = data.json();
      updatedBalance = resObject;
    });
    return updatedBalance;
  }
}
