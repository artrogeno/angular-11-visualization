import {Component, ViewChild, AfterViewInit, ChangeDetectorRef, AfterViewChecked, OnInit} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {combineLatest, merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';


import { MASK } from '@shared/constants';
import { UserI, PaginatorI, EmailI, PhoneI } from '@shared/interfaces';
import { HeaderService, UserService } from '@shared/services';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit,  AfterViewChecked {
  displayedColumns: string[] = ['id', 'title', 'name', 'suffix', 'email', 'phone', 'action']
  filteredAndPagedIssues: Observable<UserI[]>

  pageEvent: PageEvent

  resultsLength = 0
  isLoadingResults = true
  isRateLimitReached = false
  maskPhone = MASK.PHONE

  pagination: PaginatorI = {
    length: 0,
    pageSize: 10,
    pageSizeOptions: [5, 10, 25, 100]
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private activated: ActivatedRoute,
    private changeDetector : ChangeDetectorRef,
    private userService: UserService,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.headerService.load(this.activated)
  }

  ngAfterViewChecked(): void {
    this.changeDetector.detectChanges()
  }

  ngAfterViewInit(): void {
    this.filteredAndPagedIssues = merge(this.sort.sortChange, this.paginator.page, this.paginator.pageSize )
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true
          return this.userService.get(this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize)
        }),
        map(data => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.pagination.length = data.total_count

          return data.items;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      );
  }

  resetPaging(): void {
    this.paginator.pageIndex = 0;
  }

  show (id: number) {
    this.router.navigate(['/admin/forms/basic', id])
  }

  edit (id: number) {
    this.router.navigate(['/admin/forms/basic', id, 'edit'])
  }

  getEmail(items: EmailI[]): string {
    return items.find(item => !!item.active).email || ''
  }

  getPhoneNumber(items: PhoneI[]): string {
    return items.find(item => !!item.active).number || ''
  }
}
