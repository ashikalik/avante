import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class KeyInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        req = req.clone({headers: req.headers.set('x-key', '@FHI;c-@Gd9FCV!Y@B!V}e?5AnDDa6hgjkhgkhjgjhgjkhfhgkdf')});

        return next.handle(req);
    }
}
