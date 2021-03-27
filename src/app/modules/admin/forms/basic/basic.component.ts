import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HeaderService } from '@shared/services';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {

  constructor(
    private activated: ActivatedRoute,
    private headerService: HeaderService
  ) { }

  ngOnInit(): void {
    this.activated.data.subscribe(({title = ''}) => this.headerService.setTitle(title))
  }
}
