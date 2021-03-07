import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'

import { AuthService } from '@shared/services/auth.service'

import { SignInComponent } from './sign-in.component'
import { MaterialModule } from '@shared/module/material/material.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

fdescribe('SignInComponent', () => {
  let component: SignInComponent
  let fixture: ComponentFixture<SignInComponent>
  let service: AuthService

  let credentialMock = { email: 'test@mail.com', password: '123456' }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInComponent ],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        MaterialModule,
        HttpClientTestingModule
      ],
      providers: [
        AuthService
      ]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent)
    service = TestBed.inject(AuthService)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('ngOnInit', () => {
    it('should return form invalid when form is empty', () => {
      expect(component.formSignIn.valid).toBeFalsy()
    })

    it('should validate email input as required', () => {
      const email = component.formSignIn.controls.email

      expect(email.valid).toBeFalsy()
      expect(email.errors.required).toBeTruthy()
    })

    it('should validate password input as required', () => {
      const password = component.formSignIn.controls.password

      expect(password.valid).toBeFalsy()
      expect(password.errors.required).toBeTruthy()
    })

    it('should validate email format', () => {
      const email = component.formSignIn.controls.email
      email.setValue('test@mail.com')
      const errors = email.errors || {}

      expect(email.valid).toBeTruthy()
      expect(errors.required).toBeFalsy()
      expect(errors.pattern).toBeFalsy()

    })
  })

  describe('onSubmit', () => {
    // it('', () => {
    //   const form = component.formSignIn.setValue(credentialMock)

    //   console.log({ isValid: form. } )


    // })

  });

  describe('isError', () => {
    it('should have error on input email', () => {
      const email = component.formSignIn.controls.email
      email.setValue('test')
      email.markAsTouched()

      const isError = component.isError('email')

      expect(component.formSignIn.controls.email.invalid).toBeTruthy()
      expect(component.formSignIn.controls.email.touched).toBeTruthy()
      expect(isError).toBeTruthy()
    })
    it('should no have error on input email', () => {
      const email = component.formSignIn.controls.email
      email.setValue(credentialMock.email)
      email.markAsTouched()

      const isError = component.isError('email')

      expect(component.formSignIn.controls.email.valid).toBeTruthy()
      expect(component.formSignIn.controls.email.touched).toBeTruthy()
      expect(isError).toBeFalsy()
    })
    it('should have error on input password', () => {
      const password = component.formSignIn.controls.password
      password.setValue('')
      password.markAsTouched()

      const isError = component.isError('password')

      expect(component.formSignIn.controls.password.invalid).toBeTruthy()
      expect(component.formSignIn.controls.password.touched).toBeTruthy()
      expect(isError).toBeTruthy()
    })
    it('should no have error on input password', () => {
      const password = component.formSignIn.controls.password
      password.setValue(credentialMock.password)
      password.markAsTouched()

      const isError = component.isError('password')

      expect(component.formSignIn.controls.password.valid).toBeTruthy()
      expect(component.formSignIn.controls.password.touched).toBeTruthy()
      expect(isError).toBeFalsy()
    })
  })

  describe('getErrorMessage', () => {
    it('should return message if email is empty', () => {
      const email = component.formSignIn.controls.email
      email.setValue('')
      email.markAsTouched()

      const message = component.getErrorMessage('email')

      expect(message).toEqual('You must enter a value')
    })
    it('should return message if email is invalid', () => {
      const email = component.formSignIn.controls.email
      email.setValue('test')
      email.markAsTouched()

      const message = component.getErrorMessage('email')

      expect(message).toEqual('Not a valid email')
    })
    it('should return message if password is empty', () => {
      const password = component.formSignIn.controls.password
      password.setValue('')
      password.markAsTouched()

      const message = component.getErrorMessage('password')

      expect(message).toEqual('You must enter a value')
    })
    it('should return message if password is invalid', () => {
      const password = component.formSignIn.controls.password
      password.setValue('test')
      password.markAsTouched()

      const message = component.getErrorMessage('password')

      expect(message).toEqual('Not a valid password')
    })
  })
})
