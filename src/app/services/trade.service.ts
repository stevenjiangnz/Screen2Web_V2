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

  public async deleteBroker(brokerId) {
    const opt = await super.getOptions();

    await this.http.delete(this.baseUrl + '/broker?id=' + brokerId, opt).toPromise();
  }
}
