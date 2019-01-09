import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LanguageSettingService} from "../core/language-setting.service";

@Injectable()
export class LanguageInterceptor implements HttpInterceptor {

    constructor(private languageSettingService: LanguageSettingService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const language = this.languageSettingService.getLanguage();
        if (language) {
            req = req.clone({headers: req.headers.set('x-lang', language)});
        } else {
            req = req.clone({headers: req.headers.set('x-lang', 'ar')});
        }

        return next.handle(req);
    }
}
