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
}
