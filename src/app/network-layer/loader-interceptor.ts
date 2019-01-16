import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {LoaderService} from "../loader-service.service";
import {catchError, tap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class LoaderInterceptorService implements HttpInterceptor {

    private totalRequests = 0;

    constructor(private loadingService: LoaderService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        this.totalRequests++;
        this.loadingService.show();
        return next.handle(request).pipe(
            tap(res => {
                if (res instanceof HttpResponse) {
                    this.decreaseRequests();
                }
            }),
            catchError(err => {
                this.decreaseRequests();
                throw err;
            })
        );
    }

    private decreaseRequests() {
        this.totalRequests--;
        if (this.totalRequests === 0) {
            this.loadingService.hide();
        }
    }
}