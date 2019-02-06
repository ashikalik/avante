import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../../core/user-auth.service';
import { Router } from '@angular/router';


@Injectable()
export class SellerGuard implements CanActivate {
  constructor(private userAuthService: UserAuthService,
    private myRoute: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {


    const userType = this.userAuthService.getUserProfile();
    console.log(userType);
    if (userType != null && userType.data.user_type && userType.data.user_type == '4') {
      return true;
    } else {
      this.userAuthService.clearSession();
      this.myRoute.navigate(['/home']);
      return false;
    }
  }
}