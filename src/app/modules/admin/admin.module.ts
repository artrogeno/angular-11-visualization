import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { DashComponent } from './dash/dash.component';
import { PatterBridgeComponent } from './patter-bridge/patter-bridge.component';
import { CtrFormAccessComponent } from './ctr-form-access/ctr-form-access.component';
import { CustomFormComponent } from './custom-form/custom-form.component';
import { WidgetWrapperComponent } from './patter-bridge/components/widget-wrapper/widget-wrapper.component';
import { BitcoinWidgetComponent } from './patter-bridge/components/widgets/bitcoin-widget/bitcoin-widget.component';
import { DollarWidgetComponent } from './patter-bridge/components/widgets/dollar-widget/dollar-widget.component';
import { LockInputComponent } from './ctr-form-access/components/lock-input/lock-input.component';
import { AdminSearchComponent } from './components/admin-search/admin-search.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminHeaderComponent,
    AdminSidebarComponent,
    DashComponent,
    PatterBridgeComponent,
    CtrFormAccessComponent,
    CustomFormComponent,
    WidgetWrapperComponent,
    BitcoinWidgetComponent,
    DollarWidgetComponent,
    LockInputComponent,
    AdminSearchComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }
