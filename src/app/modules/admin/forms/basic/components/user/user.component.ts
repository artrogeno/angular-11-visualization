import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'

import { MODE } from '@shared/constants'
import { HeaderService, Load, UserService } from '@shared/services'
import { EmailI, PhoneI, UserI } from '@shared/interfaces'
import { MatTabChangeEvent } from '@angular/material/tabs'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  formGroup: FormGroup
  id: number
  mode: string
  tabIndex = 0

  constructor(
    private router: Router,
    private activated: ActivatedRoute,
    private fb: FormBuilder,
    private load: Load,
    private userService: UserService,
    private headerService: HeaderService
  ) { }

  ngOnInit(): void {
    this.activated.queryParams.subscribe(({ tab }) => {
      if (tab) {
        this.tabIndex = Number(tab)
        this.headerService.setQuery({tab})
      }
    })
    this.headerService.load(this.activated)
    this.loadUser()
  }

  loadUser(): void {
    this.load.show()
    combineLatest(this.activated.data, this.activated.params)
      .pipe(
        map(([{mode}, { id = null }]) => {
          this.id = id && Number(id)
          return mode
        })
      )
      .subscribe(mode => {
        this.mode = mode
        this.formDefinition()
        this.load.hide()
      })
  }

  onTabChange(event: MatTabChangeEvent): void {
    this.router.navigate([], { queryParams: { tab: event.index } });
  }

  private formDefinition(): void {
    this.formGroup = this.fb.group({
      mode: [this.mode],
      title: [null],
      firstName: ['', [Validators.required]],
      middleName: [null],
      lastName: ['', [Validators.required]],
      suffix: [null],
      hireDate: [null],
      birthDate: [null],
      gender: [null],
      officeNo: [null],
      position: [null],
      language: [null],
      address: this.addressDefinition(),
      commerce: this.commerceDefinition(),
      emailAddresses: this.emailAddressesDefinition(),
      phoneNumbers: this.phoneNumbersDefinition()
    })
    if ([MODE.SHOW, MODE.EDIT, MODE.DELETE].includes(this.mode)) {
      if (this.mode !== MODE.EDIT) {
        this.formGroup.disable()
      }
      this.userService.find(this.id).subscribe(res => {
        let user = res
        if (user.birthDate) {
          user = { ...user, birthDate: new Date(user.birthDate).toISOString() }
        }
        if (user.hireDate) {
          user = { ...user, hireDate: new Date(user.hireDate).toISOString() }
        }
        if (user.phoneNumbers && user.phoneNumbers.length > 0) {
          this.updatePhoneNumbers(user.phoneNumbers)
        }
        if (user.emailAddresses && user.emailAddresses.length > 0) {
          this.updateEmailAddresses(user.emailAddresses)
        }
        this.formGroup.patchValue(user)
        this.formGroup.updateValueAndValidity({ onlySelf: false, emitEvent: true })
      })
    }
  }

  private addressDefinition(): FormGroup {
    return this.fb.group({
      country: [null],
      countryId: [null],
      city: [null],
      cityId: [null],
      postalCode: [null],
      longitude: [null],
      latitude: [null],
      timezone: [null],
      state: [null],
      stateId: [null]
    })
  }

  private commerceDefinition(): FormGroup {
    return this.fb.group({
      currency: [null],
      currencyCode: [null],
      bitcoinAddress: [null],
      creditCard: [null],
      creditCardType: [null],
      iban: [null],
      retail: [null],
      stockIndustry: [null],
      stockMarket: [null],
      stockMarketCap: [null],
      stockName: [null],
      stockSector: [null],
      stockSymbol: [null],
    })
  }

  private emailAddressesDefinition(): FormArray {
    return this.fb.array([])
  }

  private phoneNumbersDefinition(): FormArray {
    return this.fb.array([])
  }

  private updateEmailAddresses(emails: EmailI[]) {
    const emailAddresses = <FormArray> this.formGroup.controls.emailAddresses
    emails.forEach(email => {
      const form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        type: [null],
        active: [false, [Validators.required]],
      })
      form.patchValue(email)
      emailAddresses.push(form)
    });
    emailAddresses.updateValueAndValidity()
  }

  private updatePhoneNumbers(phones: PhoneI[]) {
    const phoneNumbers = <FormArray> this.formGroup.controls.phoneNumbers
    phones.forEach(phone => {
      const form = this.fb.group({
        number: ['', [Validators.required]],
        type: [null],
        active: [false, [Validators.required]],
      })
      form.patchValue(phone)
      phoneNumbers.push(form)
    });
    phoneNumbers.updateValueAndValidity()
  }
}
