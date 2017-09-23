import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import * as _ from 'underscore';
import { ObjHelper } from '../utils/obj-helper';
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

  public async getShareList(): Promise<Share[]> {
    let shares = new Array<Share>();

    if (LocalStoreHelper.get(StorageKey.SHARE_LIST)) {
      shares = JSON.parse(LocalStoreHelper.get(StorageKey.SHARE_LIST));
    } else {
      // await this.userService.ensureLogin().then(async (token) => {
        const opt = await super.getOptions();
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
      // });
    }

    return shares;
  }

  public async getStockInfo(shareId) {
    return null;
  }

  public getStockDateRange(tradingDate?: number): any {
    let endDate: number;
    let startDate: number;

    if (tradingDate) {
      endDate = tradingDate;
    } else {
      endDate = ObjHelper.dateToInt(new Date());
    }

    startDate = endDate - this.settings.general.stockWindow;

    return {start: startDate, end: endDate};
  }

  public async getShareByID(shareId: number): Promise<Share> {
    const shareList = await this.getShareList();
    let foundShare = null;

    foundShare = _.find(shareList, (share) => {
      if (share.id.toString() === shareId.toString()) {
        return share;
      }
    });

    return foundShare;
  }
}
