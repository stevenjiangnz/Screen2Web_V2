import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SharedService } from './shared.service';
import 'rxjs/Rx';

@Injectable()
export class ServiceAccessService {
  baseUrl: string;

  constructor(private http: Http) {
    this.baseUrl = new SharedService().getSettings().apiBaseUrl;
  }

  // getTestString(): string {
  //   return 'test string';
  // }

  // getOnlineStatus(url: string): Observable<string> {
  //  return this.http.get(url)
  //                       // ...and calling .json() on the response to return data
  //                        .map((res: Response) => res.ok)
  //                        .catch((error: any) => Observable.throw(error));

  // }

  getVideos() {
    return this.http.get(`http://dummy.com/videos`)
                    .map(res => res.json().data);
  }

  getText() {
    return this.http.get(`http://dummy.com/videos`)
                    .map(res => res.text());
  }

}
