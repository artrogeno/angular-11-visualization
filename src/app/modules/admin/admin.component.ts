import { Component, OnInit } from '@angular/core';

import { LayoutService } from '@shared/services/layout.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public sidebar: boolean

  constructor(private layoutService: LayoutService) {
    this.layoutService.layoutCurrent.subscribe(({ sidebar }) => this.sidebar = sidebar )
  }

  ngOnInit(): void {
  }

}
