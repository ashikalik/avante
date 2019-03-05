import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserAuthService} from '../core/user-auth.service';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

    constructor(private userAuthService: UserAuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = this.userAuthService.getToken();
        if (token) {
            req = req.clone({headers: req.headers.set('x-token', token)});
        }

        return next.handle(req);
    }
}
