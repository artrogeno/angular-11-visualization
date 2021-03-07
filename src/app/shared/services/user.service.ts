import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { API } from '@shared/constants/api';
import { UserI } from '@shared/interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  list(): Observable<UserI[]> {
    return this.http.get<UserI[]>(API.USER)
  }
}
