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

  getCurrentZone() : Zone {
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
}
