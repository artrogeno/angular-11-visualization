import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MaterialModule } from './module/material/material.module'
import { NgxMaskDirective } from './directives/ngx-mask.directive'
import { PipeMaskPipe } from './pipes/pipe-mask.pipe'
import { LaodComponent } from './components/laod/laod.component'

@NgModule({
  declarations: [
    NgxMaskDirective,
    PipeMaskPipe,
    LaodComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    MaterialModule,
    NgxMaskDirective,
    PipeMaskPipe,
    LaodComponent,
  ]
})
export class SharedModule { }
