import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from "../core/core.module";
import {RecaptchaModule} from 'ng-recaptcha';
import {RecaptchaFormsModule} from 'ng-recaptcha/forms';
import {NetworkLayerModule} from "../network-layer/network-layer.module";
import {CommonModule} from '@angular/common';
import {SharedModule} from "../shared/shared.module";


export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

export const BASE_MODULES: any[] = [
    CoreModule,
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NetworkLayerModule,
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
    TranslateModule.forChild({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    })
];
