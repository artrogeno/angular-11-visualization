import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '@shared/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const noCredentials = request.headers.has('without-credentials')
    if (this.authService.isAuthenticated() || !noCredentials) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.getJwtToken()}`
        }
      })
    }
    return next.handle(request);
  }
}
