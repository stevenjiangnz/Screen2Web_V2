import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { StorageKey } from '../global/enums';
import { BaseService } from './baseService';
import { UserService } from './user.service';
import { Share } from '../model/EntityDefinitions';

@Injectable()
export class ShareService extends BaseService {

  constructor(public http: Http, public userService: UserService) {
    super(http);

  }

  async getShareList(): Promise<Share[]> {
    let shares = new Array<Share>();
    await this.userService.ensureLogin().then(async (token) => {
      const opt = super.getOptions(token);
      const resPromise = await this.http.get(this.baseUrl + '/share', opt).toPromise().then((data) => {
        // console.log('get share result: ', data);
      });
    });

    return shares;
  }
}
