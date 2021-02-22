import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { SignInComponent } from './sign-in.component';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInComponent ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return form invalid when form is empty', () => {
    expect(component.formSignIn.valid).toBeFalsy();
  })

  it('should validate email input as required', () => {
    const email = component.formSignIn.controls.email;

    expect(email.valid).toBeFalsy();
    expect(email.errors.required).toBeTruthy()
  })

  it('should validate password input as required', () => {
    const password = component.formSignIn.controls.password;

    expect(password.valid).toBeFalsy();
    expect(password.errors.required).toBeTruthy();
  })

  it('should validate email format', () => {
    const email = component.formSignIn.controls.email;
    email.setValue('test@mail.com');
    const errors = email.errors || {}

    expect(email.valid).toBeTruthy()
    expect(errors.required).toBeFalsy()
    expect(errors.pattern).toBeFalsy()

  })
});
