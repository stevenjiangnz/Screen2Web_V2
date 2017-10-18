import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import * as _ from 'underscore';
import { AnalysisService } from '../../services/analysis.service';
import { DialogConfirmComponent } from '../../component/dialog-confirm/dialog-confirm.component';
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
  private selectedRule;
  p: number = 1;
  private sortReverse = false;

  constructor(private _analysisService: AnalysisService, private _toasterService: ToasterService, public dialog: MdDialog) { }

  async ngOnInit() {
    this.rules = await this._analysisService.getRuleList();
  }

  ngAfterViewInit() {
  }

  onClickOrder(header) {
    this.sortType = header;
    this.sortReverse = !this.sortReverse;
  }

  async deleteRule(ruleId) {

    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '450px',
      data: { hint: `Are sure you want to remove rule ${ruleId}?`}
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result && result === 'Yes') {
        await this._analysisService.deleteRule(ruleId);
        this.rules = _.without(this.rules, _.findWhere(this.rules, {id: ruleId}));
        this._toasterService.pop('success', 'Validation error', 'Formula is required.');
      }
    });
  }

  editRule(ruleId) {
    this.selectedRule = _.findWhere(this.rules, {id: ruleId});
  }

  createRule() {
    this.selectedRule = null;
  }
  onRuleCreated(newRule) {
    this.rules.push(newRule);
  }
}
