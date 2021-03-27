import { Component, OnInit } from '@angular/core';

import { MODE } from '@shared/constants';
import { HeaderI } from '@shared/interfaces';
import { HeaderService } from '@shared/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  id: number
  query: any
  modeType: any = MODE
  header: HeaderI = {};

  constructor(private headerService: HeaderService) { }

  ngOnInit(): void {
    this.headerService.headerCurrent.subscribe((header: HeaderI) => {
      this.header = header;
      header.params && this.getParams()
      header.query && this.getQuery()
    })
  }

  private getParams() {
    const {id} = this.headerService.getParams()
    this.id = id ? Number(id) : null
  }

  private getQuery() {
    const query = this.headerService.getQuery()
    this.query = query ? query : null
  }

}
