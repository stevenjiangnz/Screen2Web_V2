import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rule-edit',
  templateUrl: './rule-edit.component.html',
  styleUrls: ['./rule-edit.component.scss']
})
export class RuleEditComponent implements OnInit {
  ruleForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.ruleForm = this.fb.group({
      name: ['', Validators.required],
      direction: 'long',
    });

    this.ruleForm.patchValue({
      direction: 'long'
    });
  }

  cancelForm() {
    console.log('cancel form....');

    this.ruleForm.reset();
  }
}
