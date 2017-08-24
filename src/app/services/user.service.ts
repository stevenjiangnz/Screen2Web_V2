import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Token } from '../model/EntityDefinitions';
import { BaseService } from './baseService';

import { StorageKey } from '../global/enums';
import { LocalStoreHelper } from '../utils/local-store-helper';
import { AuthService } from './auth.service';

@Injectable()
export class UserService extends BaseService {
  public static token: Token;

  constructor(public http: Http, private authService: AuthService) {
    super(http);
  }

  public async ensureLogin(userName: string = '', password: string = ''): Promise<Token> {
    const loginPromise = new Promise<Token>((resolve, reject) => {
      if (UserService.token) {
        resolve(UserService.token);
      } else {
        this.authService.login(userName, password).then((data) => {
          UserService.token = data;
          resolve(data);
        });
      }
    });

    return loginPromise;
  }
}
