import { Component, OnInit } from '@angular/core';
import { Load } from '@shared/services';

@Component({
  selector: 'laod',
  templateUrl: './laod.component.html',
  styleUrls: ['./laod.component.scss']
})
export class LaodComponent implements OnInit {

  show: boolean

  constructor(private load: Load) {
    this.load.loadCurrent.subscribe(({show}) => this.show = show)
  }

  ngOnInit(): void {
  }
}
