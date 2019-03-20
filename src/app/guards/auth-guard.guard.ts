import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private storage: StorageService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // console.log(next.url[0].path);
    const path = next.url[0].path;
    if (this.storage.getLoginId()) {

      if (path === 'login') {
        this.router.navigate(['home']);
        return false;
      } else {
        return true;
      }
    } else {
      if (path === 'login') {
        return true;
      } else {
        this.router.navigate(['login']);
        return false;
      }
    }
  }
}
