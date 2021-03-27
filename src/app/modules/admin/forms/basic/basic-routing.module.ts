import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MODE } from '@shared/constants';
import { BasicComponent } from './basic.component';
import { UserComponent } from './components/user/user.component';
import { UserListComponent } from './components/user-list/user-list.component';

const routes: Routes = [
  {
    path: '',
    component: BasicComponent,
    data: { title: 'User' },
    children: [
      {
        path: 'list',
        component: UserListComponent,
        data: { mode: MODE.LIST, subtitle: 'List' }
      },
      {
        path: 'add',
        component: UserComponent,
        data: { mode: MODE.CREATE, subtitle: 'Create' }
      },
      {
        path: ':id',
        component: UserComponent,
        data: { mode: MODE.SHOW, subtitle: 'Show' }
      },
      {
        path: ':id/edit',
        component: UserComponent,
        data: { mode: MODE.EDIT, subtitle: 'Edit' }
      },
      {
        path: ':id/delete',
        component: UserComponent,
        data: { mode: MODE.DELETE, subtitle: 'Delete' }
      },
      {
        path: '',
        redirectTo: '/admin/forms/basic/list'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicRoutingModule { }
