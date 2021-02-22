import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  formSignIn: FormGroup

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const regex =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.formSignIn = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(regex)]],
      password: [null, [Validators.required]],
    })
  }

  onSubmit(): void {
    console.log(this.formSignIn.value)
  }

}
