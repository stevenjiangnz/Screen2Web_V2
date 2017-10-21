import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { AnalysisService } from '../../../services/analysis.service';

@Component({
  selector: 'app-rule-edit',
  templateUrl: './rule-edit.component.html',
  styleUrls: ['./rule-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RuleEditComponent implements OnInit {
  ruleForm: FormGroup;
  mode: string;

  private _currentRule: any;

  @Input() set currentRule(value: any) {
    this._currentRule = value;

    if (this._currentRule) {
      this.mode = 'edit';
    } else {
      this.mode = 'create';
    }

    this.initForm();
  }

  @Output() ruleCreated = new EventEmitter<any>();

  @Output() ruleUpdated = new EventEmitter<any>();

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
      console.log(value);
      if (value.type === 'formula') {
        value.assembly = null;
      } else {
        value.formula = null;
      }

      if (this.mode === 'create') {
        const result = await this._analysisService.createRule(value);

        if (result && result.id) {
          this._toasterService.pop('success', 'Rule create success', '');
          this.ruleForm.reset();
          this.ruleCreated.emit(result);
        }
      } else {
        value.id = this._currentRule.id;

        const result = await this._analysisService.updateRule(value);

        if (result && result.id) {
          this._toasterService.pop('success', 'Rule update success', '');
          this.ruleUpdated.emit(result);
        }
      }
    }
  }

  initForm() {
    if (this.mode === 'create') {
      this.ruleForm.setValue({
        name: '',
        direction: 'long',
        description: '',
        type: 'formula',
        assembly: '',
        formula: '',
        note: '',
        isSystem: true
      });
    } else {
      this.ruleForm.setValue({
        name: this._currentRule.name,
        direction: this._currentRule.direction,
        description: this._currentRule.description,
        type: this._currentRule.type,
        assembly: this._currentRule.assembly,
        formula: this._currentRule.formula,
        note: this._currentRule.note,
        isSystem: this._currentRule.isSystem,
      });
    }
  }

  customValid(value) {
    let isValid = true;
    if (value.type === 'formula') {
      if (!value.formula) {
        isValid = false;
        this._toasterService.pop('error', 'Validation error', 'Formula is required.');
      }
    }

    if (value.type === 'assembly') {
      if (!value.assembly) {
        isValid = false;
        this._toasterService.pop('error', 'Validation error', 'Assembly is required.');
      }
    }

    return isValid;
  }

  cancelForm() {
    this.ruleForm.reset();
    this.initForm();
  }
}
