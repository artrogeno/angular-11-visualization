import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-contact-autocomplete',
  templateUrl: './contact-autocomplete.component.html',
  styleUrls: ['./contact-autocomplete.component.scss']
})
export class ContactAutocompleteComponent implements OnInit {

  @Input() formGroup: FormGroup

  @Input() firstNameLabel?: string

  @Input() lastNameLabel?: string

  @Input() hideFirstName?: boolean

  @Input() hideLastName?: boolean

  constructor() { }

  ngOnInit(): void {
    this.checkInputs()

    this.listUsers()
  }

  setFormData($event: MatAutocompleteSelectedEvent) {
    let person = $event.option.value;
    console.log({ person });
  }


  private checkInputs(): void {
    this.firstNameLabel = this.firstNameLabel || 'First Name'
    this.lastNameLabel = this.lastNameLabel || 'Last Name'
    this.hideFirstName = !!this.hideFirstName
    this.hideLastName = !!this.hideLastName
  }

  private listUsers(): void {
    // this.physicians = merge(this.physicianInfoForm.controls['firstname'].valueChanges, this.physicianInfoForm.controls['lastname'].valueChanges)
    //   .pipe(
    //       debounceTime(300),
    //       map(v => {
    //           return {
    //               "firstname": this.physicianInfoForm.controls['firstname'].value,
    //               "lastname": this.physicianInfoForm.controls['lastname'].value
    //           }
    //       }),
    //       filter(change => change.firstname.length >= 3 || change.lastname.length >= 3),
    //       tap(() => this.isLoading = true),
    //       switchMap(change => this.physicianService.searchPhysician(this.buildPhysicianFilterCriteria(change))
    //           .pipe(finalize(() => this.isLoading = false),)),
    //       map(resp => {
    //           return resp.body;
    //       })
    //   );
  }
}
