
import {Injectable} from '@angular/core';
import {CanActivate, CanActivateChild, Router, NavigationStart} from '@angular/router';
import {Observable} from 'rxjs';
import {Location} from '@angular/common';
import {UserAuthService} from '../../core/user-auth.service';
import { of } from 'rxjs';



@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
    private navStartUrl: string;

    constructor(private router: Router,
                private userAuthService: UserAuthService,
                private location: Location) {

        this.navStartUrl = this.location.path();

        router.events.forEach((event) => {
            if (event instanceof NavigationStart) {
                this.navStartUrl = event.url;

            }
        });


    }

    canActivate(): Observable<boolean> {
        return this.isAllowedAccess();
    }

    canActivateChild(): Observable<boolean> {
        return this.isAllowedAccess();
    }

    private isAllowedAccess() {

        if (this.userAuthService.getToken() == null) {
            this.router.navigate(['/home']);
            return of(false);
        } else {

            // Following code prevents cross access
            const userType = this.userAuthService.getUserProfile();

            if (this.navStartUrl && this.navStartUrl.indexOf('/seller') > -1 && userType == '2') {
                this.userAuthService.clearSession();
                this.router.navigate(['/home']);
                return of(false);

            } else if (this.navStartUrl && this.navStartUrl.indexOf('/organizer') > -1 && userType == '4') {
                this.userAuthService.clearSession();
                this.router.navigate(['/home']);
                return of(false);

            } else {
                return of(true);
            }


        }
    }
}
