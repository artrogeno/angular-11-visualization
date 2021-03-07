import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (
    private router: Router,
    private authService: AuthService
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isValid = this.authService.jwtTokenIsValid()
    if (isValid) {
      return true;
    }
    this.router.navigate(['/auth/sing-in'])
    return false;
  }

}
