import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API } from '@shared/constants/api';
import { CountryI } from '@shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) {}

  get(): Observable<CountryI[]> {
    return this.http.get<CountryI[]>(API.COUNTRY)
  }

  find(id: number): Observable<CountryI> {
    return this.http.get<CountryI>(`${API.COUNTRY}/${id}`)
  }
}
