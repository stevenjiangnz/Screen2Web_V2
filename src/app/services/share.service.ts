import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import * as _ from 'underscore';
import { StorageKey } from '../global/enums';
import { BaseService } from './baseService';
import { UserService } from './user.service';
import { LocalStoreHelper } from '../utils/local-store-helper';
import { Share } from '../model/EntityDefinitions';

@Injectable()
export class ShareService extends BaseService {

  constructor(public http: Http, public userService: UserService) {
    super(http);

  }

  async getShareList(): Promise<Share[]> {
    let shares = new Array<Share>();

    if (LocalStoreHelper.get(StorageKey.SHARE_LIST)) {
      console.log('load from store');
      shares = JSON.parse(LocalStoreHelper.get(StorageKey.SHARE_LIST));
    } else {
      console.log('load from service');
      await this.userService.ensureLogin().then(async (token) => {
        const opt = super.getOptions(token);
        const resPromise = await this.http.get(this.baseUrl + '/share', opt).toPromise().then((data) => {
          const resObject = data.json();
          _.each(resObject, (item: any) => {
            const share: Share = new Share();
            if (item.isActive) {
              shares.push(item as Share);
            }
          });
          LocalStoreHelper.set(StorageKey.SHARE_LIST, shares);
        });
      });
    }

    return shares;
  }
}
