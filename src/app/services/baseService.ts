import { Observable } from 'rxjs/Observable';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import { SharedService } from './shared.service';
import 'rxjs/add/operator/map';

export class BaseService {
    public baseUrl: string;

    constructor(public http: Http) {
        this.baseUrl =  new SharedService().getSettings().apiBaseUrl;
    }

    handleError(error: any) {
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'error occurs';
        console.error(error, errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    getOptions(): RequestOptions {
    const headers: Headers = new Headers();
    headers.append('content-type', 'application/json; charset=utf-8');
    const opts = new RequestOptions({headers: headers});
    opts.headers = headers;
    return opts;
  }

}
