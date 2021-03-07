import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ctr-form-access',
  templateUrl: './ctr-form-access.component.html',
  styleUrls: ['./ctr-form-access.component.scss']
})
export class CtrFormAccessComponent implements OnInit {
  form: FormGroup

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null],
      locked: [false]
    })
  }

  onSubmit(): void {
    console.log(this.form.value)
  }

}
