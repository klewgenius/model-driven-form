import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {

  form: FormGroup;
  readonly rules = [{
    role: 'admin',
    default: false,
    checked:
    {
      'executionmanager': true,
      'managementstudio': true,
      'analyze': false
    },
    unchecked: {}
  },
  {
    role: 'analyze',
    default: false,
    checked:
    {
      'admin': false,
      'executionmanager': false,
      'managementstudio': false
    },
    unchecked: {}
  },
  {
    role: 'executionmanager',
    default: false,
    checked: {},
    unchecked:
    {
      'admin': false
    }
  },
  {
    role: 'managementstudio',
    default: false,
    checked: {},
    unchecked:
    {
      'admin': false
    }
  }];

  ngOnInit() {
    this.onChanges();
  }

  constructor(@Inject(FormBuilder) private fb: FormBuilder) {

    this.form = fb.group({
      name: '',
      roles: this.createRolesGroup()
    });

  }

  private createRolesGroup() {
    const group = this.fb.group({});
    this.rules.forEach(control => group.addControl(control.role, this.fb.control(control.default)));
    return group;
  }


  onChanges() {

    this.rules.forEach((rule) => {
      this.form.get(['roles', rule.role])
      .valueChanges
      .subscribe(val => {
          this.form.get('roles').patchValue(val ? rule.checked : rule.unchecked);
      });
    });

  }

}
