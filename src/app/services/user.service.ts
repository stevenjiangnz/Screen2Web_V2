import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Token } from '../model/EntityDefinitions';
import { BaseService } from './baseService';

import { StorageKey } from '../global/enums';
import { LocalStoreHelper } from '../utils/local-store-helper';
import { AuthService } from './auth.service';

@Injectable()
export class UserService extends BaseService{
  private static isLogged = false;
  private static token: Token;

  public isLoggedIn(): boolean {
    return UserService.isLogged;
  }

  constructor(public http: Http, private authService: AuthService) {
    super(http);
  }

  public async ensureLogin(): Promise<Token> {
    //  const loginPromise = new Promise<Token> ((resolve, reject) => {
    //   this.authService.login('', '').then((result) => {
    //     const token = new Token();
    //     token.token = 'token example';
    //     resolve(token);
    //   });
    // });

    return this.authService.login('', '');
  }
}
