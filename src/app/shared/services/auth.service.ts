import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { API } from '@shared/constants/api'
import { environment } from '@environments/environment'
import { ILogin, ILoginResponse } from '@shared/interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  signIn(credential: ILogin): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(API.SIGNIN, credential).pipe(
      tap(({ token }) => {
        this.setJwtToken(token)
      })
    )
  }

  logout(): void {
    this.removeJwtToken()
    this.router.navigate(['/'])
  }

  isAuthenticated(): boolean {
    return !!this.getJwtToken()
  }

  setJwtToken(token: string): void {
    localStorage.setItem(environment.lsToken, token)
  }

  getJwtToken(): string {
    return localStorage.getItem(environment.lsToken)
  }

  removeJwtToken(): void {
    localStorage.removeItem(environment.lsToken)
  }

  getJwtTokenPayload(token: string): any {
    const data = token.split('.')[1]
    const strPayload = window.atob(data)
    return JSON.parse(strPayload)
  }

  jwtTokenIsValid(): boolean {
    return !!this.getJwtToken()
  }
}
