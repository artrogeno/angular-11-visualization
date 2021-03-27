import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule as AngularFormsModule } from '@angular/forms';

import { MaterialModule } from '@shared/module/material/material.module';
import { SharedModule } from '@shared/shared.module';
import { FormsRoutingModule } from './forms-routing.module';
import { FormsComponent } from './forms.component';
import { BasicModule } from './basic/basic.module';

@NgModule({
  declarations: [
    FormsComponent
  ],
  imports: [
    CommonModule,
    AngularFormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    FormsRoutingModule,
    BasicModule,
  ]
})
export class FormsModule { }
