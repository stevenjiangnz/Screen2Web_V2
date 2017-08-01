import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Token } from 'app/model/token';
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

    return this.http.post(this.url, body.toString(), {headers});
  }
}
