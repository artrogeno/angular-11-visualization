import { Component, ContentChild, OnInit } from '@angular/core';

import { WIDGET } from '../widgets/widget.token';
import { Widget } from '../widgets/widget.interface';



@Component({
  selector: 'app-widget-wrapper',
  templateUrl: './widget-wrapper.component.html',
  styleUrls: ['./widget-wrapper.component.scss']
})
export class WidgetWrapperComponent implements OnInit {
  @ContentChild(WIDGET as any, {static: true})
  widget: Widget
  constructor() { }

  ngOnInit(): void {
    this.widget.load()
  }

  onRefresh(): void {
    this.widget.refresh()
  }
}
