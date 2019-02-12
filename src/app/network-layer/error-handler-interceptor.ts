import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpError } from './http-error.config';
import { UserAuthService } from '../core/user-auth.service';
import { Router } from '@angular/router';


/**
 * Adds a default error handler to all requests.
 */
@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {


    constructor(public userAuthService: UserAuthService,
        public router: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError(error => this.errorHandler(error)));
    }

    private errorHandler(response: HttpEvent<any>): Observable<HttpEvent<any>> {


        if (response['status'] === HttpError.UNAUTHORIZED) {
            this.userAuthService.clearSession();
            this.router.navigate(['/login']);
        } else if (response['status'] === HttpError.FORBIDDEN) {
        } else if (response['status'] === HttpError.NOT_FOUND) {
        } else if (response['status'] === HttpError.NOT_ACCEPTABLE) {
        } else if (response['status'] === HttpError.CONFLICT) {
        } else if (response['status'] === HttpError.INTERNAL_SERVER_ERROR) {
        } else if (response['status'] === HttpError.BAD_REQUEST) {
        } else {
        }

        throw of(response);
    }
}
