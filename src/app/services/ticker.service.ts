import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import * as _ from 'underscore';
import { ObjHelper } from '../utils/obj-helper';
import { BaseService } from './baseService';
import { UserService } from './user.service';

@Injectable()
export class TickerService extends BaseService {

  constructor(public http: Http, private _userService: UserService) {
    super(http);
  }

  async getTickers(shareId, start, end, indicators): Promise<any> {
    let indicatorData;
    const queryString = `?id=${shareId}&start=${start}&end=${end}&indicator=${indicators}`;
    const opt = await super.getOptions();

    const resPromise = await this.http.get(this.baseUrl + '/ticker' + queryString, opt).toPromise().then((data) => {
      const resObject = data.json();
      indicatorData = resObject;
    });
    return indicatorData;
  }

  async getLatestByZone(shareId, zoneId) {
    let latestData;
    const queryString = `?shareid=${shareId}&zoneid=${zoneId}`;
    const opt = await super.getOptions();

    const resPromise = await this.http.get(this.baseUrl + '/ticker/getlatestbyzone' + queryString, opt).toPromise().then((data) => {
      const resObject = data.json();
      latestData = resObject;
    });
    return latestData;
  }


  async getNextByZone(shareId, zoneId) {
    let nextData;
    const queryString = `?shareid=${shareId}&zoneid=${zoneId}`;
    const opt = await super.getOptions();

    const resPromise = await this.http.get(this.baseUrl + '/ticker/getnextbyzone' + queryString, opt).toPromise().then((data) => {
      const resObject = data.json();
      nextData = resObject;
    });
    return nextData;
  }
}
