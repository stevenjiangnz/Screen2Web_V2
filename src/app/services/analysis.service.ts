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

    public async getWatchDetailList(id) {
      let watchDetailList = null;
      const opt = await super.getOptions();

      await this.http.get(this.baseUrl + '/watch/watchdetail/' + id, opt).toPromise().then((data) => {
        const resObject = data.json();
        watchDetailList = resObject;
      });
      return watchDetailList;
    }

    public async addShareToWatch(watchID, shareId) {
      const opt = await super.getOptions();

      await this.http.post(this.baseUrl + '/watch/addshare?watchid=' + watchID + '&sharelist=' + shareId,
      null, opt).toPromise().then((data) => {
      });
    }

    public async removeShareFromWatch(watchID, shareId) {
      const opt = await super.getOptions();

      await this.http.post(this.baseUrl + '/watch/removeshare?watchid=' + watchID + '&sharelist=' + shareId,
      null, opt).toPromise().then((data) => {
      });
    }

    public async getScanList(zoneId) {
      let scanList = null;
      const opt = await super.getOptions();

      await this.http.get(this.baseUrl + '/dailyscan/getbyzone?zoneid=' + zoneId, opt).toPromise().then((data) => {
        const resObject = data.json();
        scanList = resObject;
      });
      return scanList;
    }

    public async createDailyScan(scan) {
      let newScan = null;
      const opt = await super.getOptions();

      await this.http.put(this.baseUrl + '/dailyscan', JSON.stringify(scan), opt).toPromise().then((data) => {
        const resObject = data.json();
        newScan = resObject;
      });
      return newScan;
    }
    public async updateDailyScan(scan) {
      let newScan = null;
      const opt = await super.getOptions();

      await this.http.post(this.baseUrl + '/dailyscan', JSON.stringify(scan), opt).toPromise().then((data) => {
        const resObject = data.json();
        newScan = resObject;
      });
      return newScan;
    }

    public async deleteDailyScan(scanId) {
      const opt = await super.getOptions();

      await this.http.delete(this.baseUrl + '/dailyscan?id=' + scanId, opt).toPromise();
    }

    public async getAlertList(zoneId) {
      let alertList = null;
      const opt = await super.getOptions();

      await this.http.get(this.baseUrl + '/alert/getbyzone?zoneid=' + zoneId, opt).toPromise().then((data) => {
        const resObject = data.json();
        alertList = resObject;
      });
      return alertList;
    }

    public async createAlert(alert) {
      let newAlert = null;
      const opt = await super.getOptions();

      await this.http.put(this.baseUrl + '/alert', JSON.stringify(alert), opt).toPromise().then((data) => {
        const resObject = data.json();
        newAlert = resObject;
      });
      return newAlert;
    }
}
