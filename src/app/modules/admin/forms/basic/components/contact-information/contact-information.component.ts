import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MASK } from '@shared/constants';

import { EmailI, EmailTypeI, PhoneI, PhoneTypeI } from '@shared/interfaces';
import { EmailTypeService, PhoneTypeService } from '@shared/services';
import { combineLatest } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

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
  phoneMask: string = MASK.PHONE
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
      debounceTime(500),
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

  private formatPhoneForm(phones?: PhoneI[]): void {
    if (this.formGroup && this.formGroup.controls) {
      if (this.phoneNumberForm) {
        !phones && this.phoneNumberForm.value && (phones = this.phoneNumberForm.value)
        while (this.phoneNumberForm.length !== 0) {
          this.phoneNumberForm.removeAt(0)
        }
      }
      let phoneList = phones || []
      for (let index = 0; index < this.phoneDefault.length; index++) {
        const { type } = this.phoneTypes.find(item => item.type === this.phoneDefault[index])
        let data: PhoneI
        if (phones && phones.length) {
          data = phones.find(item => item.type && item.type == type)
          data && (phoneList = phoneList.filter(item => item !== data))
        }
        !data && (data = <PhoneI> { number: null, active: false, type })
        this.phoneNumberForm.push(this.phoneWithData(data))
      }
      phoneList.length > 0 && phoneList.forEach(item => this.phoneNumberForm.push(this.phoneWithData(item)))
      this.formGroup.controls.phoneNumbers = this.phoneNumberForm
    }
  }


  private formatEmailForm(emails?: EmailI[]): void {
    if (this.formGroup && this.formGroup.controls) {
      if (this.emailAddressForm ) {
        !emails && this.emailAddressForm.value && (emails = this.emailAddressForm.value)
        while (this.emailAddressForm.length !== 0) {
          this.emailAddressForm.removeAt(0)
        }
      }
      let emailList = emails || []
      for (let index = 0; index < this.emailDefault.length; index++) {
        const { type } = this.emailTypes.find(item => item.type === this.emailDefault[index])
        let data: EmailI
        if (emails && emails.length) {
          data = emails.find(item => item.type && item.type == type)
          data && (emailList = emailList.filter(item => item !== data))
        }
        !data && (data = <EmailI> { number: null, active: false, type })
        this.emailAddressForm.push(this.emailWithData(data))
      }
      emailList.length > 0 && emailList.forEach(item => this.emailAddressForm.push(this.emailWithData(item)))
      this.formGroup.controls.emailAddresses = this.emailAddressForm
    }
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
    this.formGroup.disabled && form.disable()
    return form
  }

  private emailGroup({type = null }: EmailTypeI): FormGroup {
    const form = this.fb.group({
      email: [null, [Validators.required]],
      type: [type],
      active: [false]
    })
    type && form.patchValue({ type })
    this.formGroup.disabled && form.disable()
    return form
  }

  private emailWithData({ email = null, type = null, active = false }: EmailI ) {
    const form = this.fb.group({
      email: [email, [Validators.required]],
      type: [type],
      active: [active]
    })
    this.formGroup.disabled && form.disable()
    return form
  }
}
