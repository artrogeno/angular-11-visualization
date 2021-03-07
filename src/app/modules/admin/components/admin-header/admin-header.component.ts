import { Component, OnInit } from '@angular/core';
import { LayoutService } from '@shared/services/layout.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  public sidebar: boolean

  constructor(private layoutService: LayoutService) {
    this.layoutService.layoutCurrent.subscribe(({ sidebar }) => this.sidebar = sidebar )
  }

  ngOnInit(): void {
  }

  toggleSidebar(): void {
    this.layoutService.toggleSidebar()
  }
}
