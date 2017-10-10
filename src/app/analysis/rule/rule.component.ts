import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.scss']
})
export class RuleComponent implements OnInit, AfterViewInit {


  constructor() { }
  ngOnInit() {
  }

  ngAfterViewInit() {
    const exampleId: any = $('#example');

    // exampleId.hide();
    console.log(exampleId);
    exampleId.DataTable();
  }
}
