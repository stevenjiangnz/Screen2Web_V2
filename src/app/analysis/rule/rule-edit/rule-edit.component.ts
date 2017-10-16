import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { AnalysisService } from '../../../services/analysis.service';

@Component({
  selector: 'app-rule-edit',
  templateUrl: './rule-edit.component.html',
  styleUrls: ['./rule-edit.component.scss']
})
export class RuleEditComponent implements OnInit {
  ruleForm: FormGroup;
  constructor(private fb: FormBuilder, private _toasterService: ToasterService, private _analysisService: AnalysisService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.ruleForm = this.fb.group({
      name: ['', Validators.required],
      direction: 'long',
      description: '',
      type: 'formula',
      assembly: '',
      formula: '',
      note: '',
      isSystem: true
    });
  }

  public isChecked() {
    return true;
  }

  async onSubmit({ value, valid }: { value: any, valid: boolean }) {
    if (this.customValid(value)) {
      const result = await this._analysisService.createRule(value);

      if (result && result.id) {
        this._toasterService.pop('success', 'Rule create success', '');
        this.ruleForm.reset();
      }
    }
  }

  customValid(value) {
    let isValid = true;
    if (value.type === 'formula') {
      if(!value.formula) {
        isValid = false;
        this._toasterService.pop('error', 'Validation error', 'Formula is required.');
      }
    }

    if (value.type === 'assembly') {
      if(!value.assembly) {
        isValid = false;
        this._toasterService.pop('error', 'Validation error', 'Assembly is required.');
      }
    }

    return isValid;
  }

  cancelForm() {
    console.log('cancel form....');

    this.ruleForm.reset();
  }
}
