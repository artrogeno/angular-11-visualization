import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EmailI, EmailTypeI, PhoneI, PhoneTypeI } from '@shared/interfaces';
import { EmailTypeService, PhoneTypeService } from '@shared/services';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'contact-information',
  templateUrl: './contact-information.component.html',
  styleUrls: ['./contact-information.component.scss']
})
export class ContactInformationComponent implements OnInit {

  @Input() formGroup: FormGroup

  phoneTypes: PhoneTypeI[]
  emailTypes: EmailTypeI[]
  phoneDefault: string[] = ['Business', 'Mobile']
  emailDefault: string[] = ['Business']

  loading = true

  constructor(
    private fb: FormBuilder,
    private emailTypeService: EmailTypeService,
    private phoneTypeService: PhoneTypeService,
  ) { }

  ngOnInit(): void {
    combineLatest(
      this.emailTypeService.get(),
      this.phoneTypeService.get(),
    ).pipe(
      map(([emailTypes, phoneTypes]: any) => {
        this.emailTypes = emailTypes
        this.phoneTypes = phoneTypes
        this.formatForm()
      }
    )).subscribe(() => {
      this.loading = false
    })
  }

  get phoneNumberForm(): FormArray {
    return this.formGroup.controls.phoneNumbers as FormArray
  }

  get emailAddressForm(): FormArray {
    return this.formGroup.controls.emailAddresses as FormArray
  }

  get formDisabled(): boolean {
    return this.formGroup.controls.firstName.disabled
  }

  addPhone(phoneType: PhoneTypeI): void {
    this.phoneNumberForm.push(this.phoneGroup(phoneType))
  }

  removePhone(index: number): void {
    this.phoneNumberForm.removeAt(index)
  }

  addEmail(emailType: EmailTypeI): void {
    this.emailAddressForm.push(this.emailGroup(emailType))
  }

  removeEmail(index: number): void {
    this.emailAddressForm.removeAt(index)
  }

  private formatForm(): void {
    this.formatPhoneForm();
    this.formatEmailForm();
  }

  private formatPhoneForm(): void {
    let phones = <PhoneI[]> this.phoneNumberForm.value
    if (!this.formGroup.controls.phoneNumbers) {
      this.formGroup.addControl('phoneNumbers', this.fb.array([]))
    } else {
      this.formGroup.controls.phoneNumbers = this.fb.array([])
    }
    this.formGroup.controls.phoneNumbers.updateValueAndValidity()

    if (phones && phones.length > 0) {
      let types = []
      const phoneList = phones.filter(item => {
        if (this.phoneDefault.includes(item.type)) {
          types.push(item.type)
          this.phoneNumberForm.push(this.phoneWithData(item))
          return false
        }
        return true
      })
      if (types.length === 0|| types.length <= this.phoneDefault.length) {
        this.phoneDefault.forEach(item => (
          !types.includes(item) && this.phoneNumberForm.push(this.phoneGroup({ type: item }))
        ))
      }
      phoneList.forEach(item => this.phoneNumberForm.push(this.phoneWithData(item)))
    } else {
      this.phoneTypes.forEach(item => {
        if (this.phoneDefault.includes(item.type)) {
          this.phoneNumberForm.push(this.phoneGroup(item))
        }
      })
    }
    this.formGroup.controls.firstName.disabled && this.phoneNumberForm.disable()
    this.formGroup.controls.phoneNumbers = this.phoneNumberForm
  }

  private formatEmailForm(): void {
    const emails = <EmailI[]> this.emailAddressForm.value
    if (!this.formGroup.controls.emailAddresses) {
      this.formGroup.addControl('emailAddresses', this.fb.array([]))
    } else {
      this.formGroup.controls.emailAddresses = this.fb.array([])
    }
    if (emails && emails.length > 0) {
      let types = []
      const emailList = emails.filter(item => {
        if (this.emailDefault.includes(item.type)) {
          types.push(item.type)
          this.emailAddressForm.push(this.emailWithData(item))
          return false
        }
        return true
      })
      types.length < this.emailDefault.length && this.emailDefault.forEach(item => (
        !types.includes(item) && this.emailAddressForm.push(this.emailGroup({ type: item }))
      ))
      emailList.forEach(item => this.emailAddressForm.push(this.emailWithData(item)))
    } else {
      this.phoneTypes.forEach(item => {
        if (this.emailDefault.includes(item.type)) {
          this.emailAddressForm.push(this.emailGroup(item))
        }
      })
    }
    this.formGroup.controls.firstName.disabled && this.emailAddressForm.disable()
  }

  private phoneGroup({type = null }: PhoneTypeI): FormGroup {
    const form = this.fb.group({
      number: [null, [Validators.required]],
      type: [null],
      active: [false]
    })
    type && form.patchValue({ type })
    this.formGroup.controls.firstName.disabled && form.disable()
    return form
  }

  private phoneWithData({ number = null, type = null, active = false }: PhoneI ) {
    const form = this.fb.group({
      number: [number, [Validators.required]],
      type: [type],
      active: [active]
    })
    this.formGroup.controls.firstName.disabled && form.disable()
    return form
  }

  private emailGroup({type = null }: EmailTypeI): FormGroup {
    const form = this.fb.group({
      email: [null, [Validators.required]],
      type: [type],
      active: [false]
    })
    type && form.patchValue({ type })
    this.formGroup.controls.firstName.disabled && form.disable()
    return form
  }

  private emailWithData({ email = null, type = null, active = false }: EmailI ) {
    const form = this.fb.group({
      email: [email, [Validators.required]],
      type: [type],
      active: [active]
    })
    this.formGroup.controls.firstName.disabled && form.disable()
    return form
  }
}
