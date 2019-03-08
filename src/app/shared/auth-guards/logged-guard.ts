import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../../core/user-auth.service';
import { Router } from '@angular/router';
@Injectable()
export class LoggedGuard implements CanActivate {
    constructor(private userAuthService: UserAuthService,
        private myRoute: Router,
        private activatedRouter: ActivatedRoute) {
}
canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if(this.userAuthService.getUserProfile() != null) {
            this.userAuthService.clearSession();
            this.myRoute.navigate([state.url]);            
            return true;
        } else {
            return true;
        }
    }
}
