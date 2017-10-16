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

    public async deleteRule(ruleId) {
      const opt = await super.getOptions();

      await this.http.delete(this.baseUrl + '/rule?id=' + ruleId, opt).toPromise();
    }

}
