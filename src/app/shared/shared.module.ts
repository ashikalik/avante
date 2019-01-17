import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventoDatePipe} from './evento-date.pipe';
import {EventoTimePipe} from './evento-time.pipe';
import {CoreModule} from "../core/core.module";
import {EventoDayPipe} from './evento-day.pipe';
import {EventoMonthPipe} from './evento-month.pipe';
import {MinMaxPricePipe} from './min-max-price.pipe';
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {ErrorsComponent} from './errors/errors.component';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}


@NgModule({
    declarations: [EventoDatePipe, EventoTimePipe, EventoDayPipe, EventoMonthPipe, MinMaxPricePipe, ErrorsComponent],
    imports: [
        CommonModule,
        CoreModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })

    ],
    exports: [
        EventoDatePipe,
        EventoTimePipe,
        EventoDayPipe,
        EventoMonthPipe,
        MinMaxPricePipe,
        ErrorsComponent
    ]
})
export class SharedModule {

}
