import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import * as $ from 'jquery';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HttpClient} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {RECAPTCHA_SETTINGS, RecaptchaSettings, RECAPTCHA_LANGUAGE} from 'ng-recaptcha';
import {AgmCoreModule} from '@agm/core';
import {BASE_MODULES} from './models/modules';
import {LoadingComponent} from "./shared/loading/loading.component";
import {SearchService} from "./services/search.service";
import { DeviceDetectorModule } from 'ngx-device-detector';


export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [
        AppComponent,
        LoadingComponent
    ],
    imports: [
        BrowserModule.withServerTransition({appId: 'serverApp'}),
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
        }),
        DeviceDetectorModule.forRoot()
    ],
    providers: [
        SearchService,
        {
            provide: RECAPTCHA_SETTINGS,
            useValue: {siteKey: '6LfoDokUAAAAABirpPJC2G6akcdZ6N9jwXPrYvid'} as RecaptchaSettings,
        },
        {
            provide: RECAPTCHA_LANGUAGE,
            useValue: 'ar',
        },
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule {
}
