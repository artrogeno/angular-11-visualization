import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { CtrFormAccessComponent } from './ctr-form-access/ctr-form-access.component';
import { CustomFormComponent } from './custom-form/custom-form.component';
import { DashComponent } from './dash/dash.component';
import { PatterBridgeComponent } from './patter-bridge/patter-bridge.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        component: DashComponent
      },
      {
        path: 'patter-bridge',
        component: PatterBridgeComponent
      },
      {
        path: 'ctr-value-access',
        component: CtrFormAccessComponent
      },
      {
        path: 'custom-form',
        component: CustomFormComponent
      },
      {
        path: 'forms',
        loadChildren: () => import('./forms/forms.module').then(m => m.FormsModule)
      },
      {
        path: '',
        redirectTo: '/admin/dashboard'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
