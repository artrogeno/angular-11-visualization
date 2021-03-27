import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

import { CountryI, StateI } from '@shared/interfaces';
import { CountryService, StateService } from '@shared/services';

@Component({
  selector: 'personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit {

  @Input() formGroup: FormGroup

  countries: CountryI[]
  states: StateI[]

  constructor(
    private fb: FormBuilder,
    private countryService: CountryService,
    private stateService: StateService
  ) { }

  ngOnInit(): void {
    this.loadData()
    this.observableForm()
  }

  get addressForm(): FormGroup {
    return <FormGroup>this.formGroup.controls.address
  }

  findState({ value: {id} }: MatSelectChange): void {
    this.loadStates(id)
  }

  compareCountry({id = null}: CountryI, compareId: number) {
    return id && id === compareId
  }

  compareState({ id }: StateI, compareId: number) {
    return id && id === compareId
  }

  private loadData(): void {
    this.loadCountries()
  }

  private loadCountries(): void {
    this.countryService.get().subscribe(data => {
      this.countries = data
    })
  }

  private loadStates(countryId: number): void {
    this.stateService.get(countryId).subscribe(states => {
      this.states = states
    })
  }

  private observableForm(): void {
    if (this.addressForm && this.addressForm.controls.countryId) {
      this.addressForm.controls.countryId.valueChanges
        .subscribe(id => this.loadStates(id))
    }
  }
}
