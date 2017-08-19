import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Token } from '../model/EntityDefinitions';
import { BaseService } from './baseService';

import { StorageKey } from '../global/enums';
import { LocalStoreHelper } from '../utils/local-store-helper';

@Injectable()
export class AuthService extends BaseService {
  url = 'http://localhost:8002/oauth/token';
  userName = 'stevenjiangnz';
  password = 'L@ve@ver77';

  constructor(public http: Http) {
    super(http);
  }

  public async testPromise(): Promise<string> {
    const myFirstPromise = new Promise<string> ((resolve, reject) => {
      // console.log('in promise');
      setTimeout(function(){
        resolve('Success!'); // Yay! Everything went well!
      }, 200);
    });

    return myFirstPromise;
  }

  public async testCallPromise() {
    // console.log('before call test promise');

    // await this.testPromise().then((data) => {
    //   console.log(data);
    // });

    // console.log('after call test promise');
    const myFirstPromise = new Promise((resolve, reject) => {
  // We call resolve(...) when what we were doing made async successful, and reject(...) when it failed.
  // In this example, we use setTimeout(...) to simulate async code. 
  // In reality, you will probably be using something like XHR or an HTML5 API.
    setTimeout(function(){
      resolve('Success!'); // Yay! Everything went well!
    }, 250);
    });

    myFirstPromise.then((successMessage) => {
      // successMessage is whatever we passed in the resolve(...) function above.
      // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
      console.log('Yay! ' + successMessage);
    });
  }

  public async login(userName: string, password: string) {
    let token: Token = null;
    const opt = super.getOptions(false);
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const body = new URLSearchParams();
    body.set('username', this.userName);
    body.set('password', this.password);
    body.set('grant_type', 'password');

    const res = this.http.post(this.url, body.toString(), {headers}).map((response) => response.json());

    await res.first().toPromise().then((result) => {
      token = new Token();
      token.token = result.access_token;
      token.tokeType = result.token_type;
      token.expiresIn = result.expires_in;

      LocalStoreHelper.set(StorageKey.SECURITY_TOKEN, token);
    });
  }

  public logout() {
    LocalStoreHelper.clear();
  }
}
