import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../../core/user-auth.service';
import { Router } from '@angular/router';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private userAuthService: UserAuthService,
        private myRoute: Router) {
    }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.userAuthService.getUserProfile() != null) {
            return true;
        } else {
            this.myRoute.navigate(['/home']);
            return false;
        }
    }
}
