import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpError} from './http-error.config';
import {Error} from './error';
import {ErrorObject} from './error.object';
import {UserAuthService} from '../core/user-auth.service';
import {Router} from '@angular/router';


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

        console.log(response)
        const errorObj = new ErrorObject(response);

        if (errorObj.status === HttpError.UNAUTHORIZED) {
            this.userAuthService.clearSession();
            this.router.navigate(['/login']);
        } else if (errorObj.status === HttpError.FORBIDDEN) {
        } else if (errorObj.status === HttpError.NOT_FOUND) {
        } else if (errorObj.status === HttpError.NOT_ACCEPTABLE) {
        } else if (errorObj.status === HttpError.CONFLICT) {
        } else if (errorObj.status === HttpError.INTERNAL_SERVER_ERROR) {
        } else if (errorObj.status === HttpError.BAD_REQUEST) {
        } else {
        }

        throw of(response);
    }
}
