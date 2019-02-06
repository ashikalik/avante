import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../../core/user-auth.service';
import { Router } from '@angular/router';


@Injectable()
export class SupervisorRequestsGuard implements CanActivate {
  constructor(private userAuthService: UserAuthService,
    private myRoute: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const userType = this.userAuthService.getUserProfile();
    if (userType && (userType.data.user_type == '2' || userType.data.user_type == '6')) {
      if (userType.data.user_type == '6') {
        if (userType.data.permisions && userType.data.permisions.requests == '1') {
          return true;
        }
        else {
          this.clear();
        }
      }
      else {
        return true;
      }
    } else {
      this.clear();
    }
  }


  public clear() {
    this.userAuthService.clearSession();
    this.myRoute.navigate(['/home']);
    return false;
  }


}