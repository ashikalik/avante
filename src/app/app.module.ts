import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import * as $ from 'jquery';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HttpClient} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {RECAPTCHA_SETTINGS, RecaptchaSettings, RECAPTCHA_LANGUAGE} from 'ng-recaptcha';
import {AgmCoreModule} from '@agm/core';
import {BASE_MODULES} from './models/modules';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ...BASE_MODULES,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBF36FxPdKs1lbLJUJ_krEwT3uyjK1_1cM'
        }),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        {
            provide: RECAPTCHA_SETTINGS,
            useValue: {siteKey: '6LfoDokUAAAAABirpPJC2G6akcdZ6N9jwXPrYvid'} as RecaptchaSettings,
        },
        {
            provide: RECAPTCHA_LANGUAGE,
            useValue: 'ar',
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
