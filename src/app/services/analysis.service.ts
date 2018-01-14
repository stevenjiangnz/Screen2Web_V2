import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { BaseService } from './baseService';

@Injectable()
export class AnalysisService extends BaseService {
    constructor(public http: Http) {
      super(http);
    }

    public async getRuleList() {
      let ruleList = null;
      const opt = await super.getOptions();

      await this.http.get(this.baseUrl + '/rule', opt).toPromise().then((data) => {
        const resObject = data.json();
        ruleList = resObject;
      });
      return ruleList;
    }

    public async createRule(rule) {
      let newRule = null;
      const opt = await super.getOptions();

      await this.http.put(this.baseUrl + '/rule', JSON.stringify(rule), opt).toPromise().then((data) => {
        const resObject = data.json();
        newRule = resObject;
      });
      return newRule;
    }

    public async updateRule(rule) {
      let newRule = null;
      const opt = await super.getOptions();

      await this.http.post(this.baseUrl + '/rule', JSON.stringify(rule), opt).toPromise().then((data) => {
        const resObject = data.json();
        newRule = resObject;
      });
      return newRule;
    }

    public async deleteRule(ruleId) {
      const opt = await super.getOptions();

      await this.http.delete(this.baseUrl + '/rule?id=' + ruleId, opt).toPromise();
    }

    public async getWatchList(zoneId) {
      let watchList = null;
      const opt = await super.getOptions();

      await this.http.get(this.baseUrl + '/watch/getbyzone?zoneid=' + zoneId, opt).toPromise().then((data) => {
        const resObject = data.json();
        watchList = resObject;
      });
      return watchList;
    }

    public async createWatch(watch) {
      let newWatch = null;
      const opt = await super.getOptions();

      console.log('put watch', watch);
      await this.http.put(this.baseUrl + '/watch', JSON.stringify(watch), opt).toPromise().then((data) => {
        const resObject = data.json();
        newWatch = resObject;
      });
      return newWatch;
    }

    public async updateWatch(watch) {
      let newWatch = null;
      const opt = await super.getOptions();

      await this.http.post(this.baseUrl + '/watch', JSON.stringify(watch), opt).toPromise().then((data) => {
        const resObject = data.json();
        newWatch = resObject;
      });
      return newWatch;
    }

    public async deleteWatch(watchId) {
      const opt = await super.getOptions();

      await this.http.delete(this.baseUrl + '/watch?id=' + watchId, opt).toPromise();
    }

}
