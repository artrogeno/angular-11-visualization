import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API } from '@shared/constants/api';
import { EmailTypeI } from '@shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class EmailTypeService {

  constructor(private http: HttpClient) {}

  get(): Observable<EmailTypeI[]> {
    return this.http.get<EmailTypeI[]>(API.EMAIL_TYPES)
  }
}
