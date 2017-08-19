import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { StorageKey } from '../global/enums';
import { BaseService } from './baseService';
import { Share } from '../model/EntityDefinitions';

@Injectable()
export class ShareService extends BaseService {

  constructor(public http: Http) {
    super(http);
  }

  getShareList() {
    const opt = super.getOptions(true);

    return this.http.get(this.baseUrl + '/share', opt)
                    .map((res) => {
                      return res.json();
                    });
  }
}
