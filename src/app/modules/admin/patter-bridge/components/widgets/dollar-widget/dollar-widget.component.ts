import { Component } from '@angular/core';

import { WIDGET } from '../widget.token';
import { Widget } from '../widget.interface';

@Component({
  selector: 'app-dollar-widget',
  templateUrl: './dollar-widget.component.html',
  styleUrls: ['./dollar-widget.component.scss'],
  providers: [
    {
      provide: WIDGET,
      useExisting: DollarWidgetComponent
    }
  ]
})
export class DollarWidgetComponent implements Widget {
  isLoad = false

  load() {
    console.log('Dollar API')
  }

  refresh() {
    this.isLoad = true;
    setTimeout(() => {
      this.isLoad = false
      console.log('Dollar')
    }, 1500);
  }
}
