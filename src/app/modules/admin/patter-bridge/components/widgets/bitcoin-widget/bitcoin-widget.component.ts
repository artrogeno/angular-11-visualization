import { Component } from '@angular/core';

import { WIDGET } from '../widget.token';
import { Widget } from '../widget.interface';

@Component({
  selector: 'app-bitcoin-widget',
  templateUrl: './bitcoin-widget.component.html',
  styleUrls: ['./bitcoin-widget.component.scss'],
  providers: [
    {
      provide: WIDGET,
      useExisting: BitcoinWidgetComponent,
    }
  ]
})
export class BitcoinWidgetComponent implements Widget {
  isLoad = false

  load() {
    console.log('Bitcoin API')
  }

  refresh() {
    this.isLoad = true;
    setTimeout(() => {
      this.isLoad = false
      console.log('Bitcoin')
    }, 1000);
  }
}
