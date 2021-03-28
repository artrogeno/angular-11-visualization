import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialModule } from '@shared/module/material/material.module';
import { BasicComponent } from './basic.component';
import { PersonalDataComponent } from './components/personal-data/personal-data.component';
import { HomeAddressComponent } from './components/home-address/home-address.component';
import { PhonesComponent } from './components/phones/phones.component';
import { SystemInformationComponent } from './components/system-information/system-information.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { SharedModule } from '@shared/shared.module';
import { UserComponent } from './components/user/user.component';
import { ContactInformationComponent } from './components/contact-information/contact-information.component';
import { BasicRoutingModule } from './basic-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { MarketInformationComponent } from './components/market-information/market-information.component';
import { MarketDialogComponent } from './components/dialog/market-dialog/market-dialog.component';

@NgModule({
  declarations: [
    BasicComponent,
    PersonalDataComponent,
    HomeAddressComponent,
    PhonesComponent,
    SystemInformationComponent,
    UserListComponent,
    UserComponent,
    ContactInformationComponent,
    HeaderComponent,
    MarketInformationComponent,
    MarketDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule,
    BasicRoutingModule
  ],
  exports: [
    PersonalDataComponent,
    HomeAddressComponent,
    PhonesComponent,
    SystemInformationComponent,
    UserListComponent,
  ],
  providers: [],
})

export class BasicModule {}
