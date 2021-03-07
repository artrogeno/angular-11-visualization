import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import {NestedTreeControl } from '@angular/cdk/tree'
import { MatTreeNestedDataSource } from '@angular/material/tree'

import { NAV } from '@shared/constants/nav'
import { INav } from '@shared/interfaces/nav'
import { AuthService } from '@shared/services/auth.service'

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [
      {name: 'Apple'},
      {name: 'Banana'},
      {name: 'Fruit loops'},
    ]
  }, {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [
          {name: 'Broccoli'},
          {name: 'Brussels sprouts'},
        ]
      }, {
        name: 'Orange',
        children: [
          {name: 'Pumpkins'},
          {name: 'Carrots'},
        ]
      },
    ]
  },
];

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {

  treeControl = new NestedTreeControl<INav>(node => node.children);
  dataSource = new MatTreeNestedDataSource<INav>();


  constructor(private routes : Router, private authService: AuthService) {
    this.dataSource.data = NAV;
  }

  ngOnInit(): void {

  }

  isActive(url: string, exact = false): boolean {
    return this.routes.isActive(url, exact)
  }

  logout(): void {
    this.authService.logout()
  }

  checkType(type: string): boolean {
    return type == 'header'
  }

  hasChild = (_: number, node: INav) => !!node.children && node.children.length > 0;
}
