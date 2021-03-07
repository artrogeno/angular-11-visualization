import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@shared/services/auth.service';
import { LayoutService } from '@shared/services/layout.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  public hide = true;
  public loading = false
  public formSignIn: FormGroup

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private layoutService: LayoutService
  ) { }

  ngOnInit(): void {
    const regex =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.formSignIn = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(regex)]],
      password: [null, [Validators.required]],
    })
  }

  onSubmit(): void {
    if (this.formSignIn.valid) {
      this.loading = true
      setTimeout(() => {
        this.layoutService.showLoading()
        this.authService.signIn(this.formSignIn.value)
          .subscribe(() => {
            this.router.navigate(['/admin/dashboard'])
            this.closeLoading()
          },
          () => {
            this.closeLoading()
          })
      }, 4000);
    }
  }

  isError(name: string): boolean {
    const input = this.formSignIn.get(name)
    return input.touched && input.invalid
  }

  getErrorMessage(name: string): string {
    const input = this.formSignIn.get(name)
    if (input.hasError('required')) {
      return 'You must enter a value'
    } else {
      return `Not a valid ${name}`;
    }
  }

  private closeLoading(): void {
    this.layoutService.hideLoading()
    this.loading = false
  }
}
