import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { API } from '@shared/constants/api';
import { UserI, UserPaginationI } from '@shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  get(sort: string, order: string, page: number, pageSize: number ): Observable<UserPaginationI> {
    return this.http.get<UserI[]>(
      `${API.USER}?_sort=${sort}&_order=${order}&_page=${page + 1}&_limit=${pageSize}`,
      { observe: 'response' }
    ).pipe(
      map(res => {
        const items = res.body
        const total_count = Number(res.headers.get('X-Total-Count') || 0)
        return { items, total_count }
      })
    )
  }

  find(id: number): Observable<UserI> {
    return this.http.get<UserI>(`${API.USER}/${id}`)
  }
}
