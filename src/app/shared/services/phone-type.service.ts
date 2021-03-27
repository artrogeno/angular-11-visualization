import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API } from '@shared/constants/api';
import { PhoneTypeI } from '@shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PhoneTypeService {

  constructor(private http: HttpClient) {}

  get(): Observable<PhoneTypeI[]> {
    return this.http.get<PhoneTypeI[]>(API.PHONE_TYPES)
  }
}
