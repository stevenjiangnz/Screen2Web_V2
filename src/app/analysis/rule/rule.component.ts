import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AnalysisService } from '../../services/analysis.service';

declare var $: any;

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.scss']
})
export class RuleComponent implements OnInit, AfterViewInit {

  constructor(private _analysisService: AnalysisService) { }

  async ngOnInit() {
    const rules = await this._analysisService.getRuleList();
  }

  ngAfterViewInit() {
    const exampleId: any = $('#example');

    // exampleId.hide();
    console.log(exampleId);
    exampleId.DataTable();
  }
}
