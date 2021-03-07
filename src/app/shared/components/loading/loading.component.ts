import { Component, OnInit } from '@angular/core';

import { LayoutService } from '@shared/services/layout.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  public loading: boolean

  constructor(private layoutService: LayoutService) {
    this.layoutService.layoutCurrent.subscribe(({ loading }) => this.loading = loading )
  }

  ngOnInit(): void {
  }
}
