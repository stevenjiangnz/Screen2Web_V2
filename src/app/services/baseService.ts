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
    public baseUrl: string;
    public token: Token;

    constructor(public http: Http) {
        this.baseUrl =  new SharedService().getSettings().apiBaseUrl;
    }

    handleError(error: any) {
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'error occurs';
        console.error(error, errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    getOptions(token?: Token): RequestOptions {
        const headers: Headers = new Headers();
        headers.append('content-type', 'application/json; charset=utf-8');

        if (token) {
            headers.append('authorization', 'bearer ' + token.token);
        }

        const opts = new RequestOptions({headers: headers});
        opts.headers = headers;
        return opts;
    }
}
