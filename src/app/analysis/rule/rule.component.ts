import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AnalysisService } from '../../services/analysis.service';
import { ToasterService } from 'angular2-toaster';

declare var $: any;

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.scss']
})
export class RuleComponent implements OnInit, AfterViewInit {
  private rules;
  private sortType = 'id';
  p: number = 1;
  private sortReverse = false;

  constructor(private _analysisService: AnalysisService, private _toasterService: ToasterService) { }

  async ngOnInit() {
    this.rules = await this._analysisService.getRuleList();
  }

  ngAfterViewInit() {
    // const exampleId: any = $('#example');

    // // exampleId.hide();
    // console.log(exampleId);
    // exampleId.DataTable();
  }

  onClickOrder(header) {
    this.sortType = header;
    this.sortReverse = !this.sortReverse;
  }

  async deleteRule(ruleId) {
    await this._analysisService.deleteRule(ruleId);
    this._toasterService.pop('success', 'Validation error', 'Formula is required.');
  }

  editRule(ruleId) {
    console.log('edit rule id: ', ruleId);
  }

}
