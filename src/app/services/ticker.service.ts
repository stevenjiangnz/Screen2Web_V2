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

  async getTickers(shareId, start, end, indicators): Promise<any[]> {
    const tickers = new Array<any>();
    const queryString = `?id=${shareId}&start=${start}&end=${end}&indicator=${indicators}`;
    await this._userService.ensureLogin().then(async (token) => {
      const opt = super.getOptions(token);
      const resPromise = await this.http.get(this.baseUrl + '/ticker' + queryString, opt).toPromise().then((data) => {
        const resObject = data.json();

        console.log(resObject);
      });
    });
    return tickers;
  }

}
