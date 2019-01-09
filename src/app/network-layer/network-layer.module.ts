import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthorizationInterceptor} from "./authorization-interceptor";
import {LanguageInterceptor} from "./language-interceptor";
import {ErrorHandlerInterceptor} from "./error-handler-interceptor";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthorizationInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LanguageInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
        }
    ]
})
export class NetworkLayerModule {
}
