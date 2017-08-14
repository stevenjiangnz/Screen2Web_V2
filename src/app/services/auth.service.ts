import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Token } from '../model/EntityDefinitions';
import { BaseService } from './baseservice';

@Injectable()
export class AuthService extends BaseService {
  url = 'http://localhost:8002/oauth/token';
  userName = 'stevenjiangnz';
  password = 'L@ve@ver77';

  constructor(public http: Http) {
    super(http);
  }

  login(userName: string, password: string): Observable<Response> {
    const opt = super.getOptions();
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const body = new URLSearchParams();
    body.set('username', this.userName);
    body.set('password', this.password);
    body.set('grant_type', 'password');

    const res = this.http.post(this.url, body.toString(), {headers});

    res.map((response) => response.json()).subscribe(result => {
      const token: Token = new Token();
      token.token = result.access_token;
      token.tokeType = result.token_type;
      token.expiresIn = result.expires_in;

      localStorage.setItem('testhere', JSON.stringify(token));
      console.log('get from local storage', localStorage.getItem('testhere'));
      // console.log(token);
    });

    return res;
  }
}
