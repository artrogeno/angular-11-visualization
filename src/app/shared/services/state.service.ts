import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API } from '@shared/constants';
import { StateI } from '@shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private http: HttpClient) {}

  get(id: number): Observable<StateI[]> {
    return this.http.get<StateI[]>(`${API.STATE}?countryId=${id}`)
  }
}
