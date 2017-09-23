import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { SharedService } from './shared.service';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { StorageKey } from '../global/enums';
import { Token } from '../model/EntityDefinitions';
import { LocalStoreHelper } from '../utils/local-store-helper';

export class BaseService {
    public static token: Token;
    public baseUrl: string;
    public settings: any;
    url = 'http://localhost:8002/oauth/token';
    userName = 'stevenjiangnz';
    password = 'L@ve@ver77';

    constructor(public http: Http) {
        this.settings = new SharedService().getSettings();
        this.baseUrl = this.settings.apiBaseUrl;
    }

    handleError(error: any) {
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'error occurs';
        console.error(error, errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    async getOptions(token?: Token): Promise<RequestOptions> {
        const headers: Headers = new Headers();
        headers.append('content-type', 'application/json; charset=utf-8');

        if (!BaseService.token) {
            console.log('about to login');
            BaseService.token = await this.login('', '');

            console.log('login done. ', BaseService.token);
        }

        headers.append('authorization', 'bearer ' + BaseService.token.token);

        const opts = new RequestOptions({ headers: headers });
        opts.headers = headers;
        return opts;
    }

    public async login(userName: string, password: string): Promise<Token> {
        const headers = new Headers();
        let token: Token;
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        const opt =  new RequestOptions({ headers: headers });
        const body = new URLSearchParams();
        body.set('username', this.userName);
        body.set('password', this.password);
        body.set('grant_type', 'password');

        const retPromise = await this.http.post(this.url, body.toString(), { headers }).map((response) => response.json())
            .toPromise().then((response) => {
                token = new Token();
                token.token = response.access_token;
                token.tokeType = response.token_type;
                token.expiresIn = response.expires_in;
            });
        return token;
    }
}
