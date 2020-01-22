import { Injectable } from '@angular/core';
import { CanActivate, CanLoad ,RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate, CanLoad {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log('AuthGuard#canActivate called');
    return true;
  }

  canLoad(): boolean {
    return true;
  }
}