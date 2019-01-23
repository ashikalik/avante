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
import {MobilePipe} from './mobile.pipe';
import {DisableDateUntilPipe} from './disable-date-until.pipe';
import {DisableDateSincePipe} from './disable-date-since.pipe';
import {DatePickerYear} from './date-picker-year.pipe';
import {DatePickerInputPipe} from './date-picker-input.pipe';
import {ConvertFrom24To12FormatPipe} from './convert-from24-to12-format.pipe';
import {AmPmTimePipe} from './am-pm-time.pipe';


export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}


@NgModule({
    declarations: [
        EventoDatePipe,
        EventoTimePipe,
        EventoDayPipe,
        EventoMonthPipe,
        MinMaxPricePipe,
        ErrorsComponent,
        MobilePipe,
        DisableDateUntilPipe,
        DisableDateSincePipe,
        DisableDateSincePipe,
        DatePickerYear,
        DatePickerInputPipe,
        ConvertFrom24To12FormatPipe,
        AmPmTimePipe
    ],
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
        ErrorsComponent,
        MobilePipe,
        DisableDateUntilPipe,
        DisableDateSincePipe,
        DatePickerYear,
        DatePickerInputPipe,
        ConvertFrom24To12FormatPipe,
        AmPmTimePipe
    ]
})
export class SharedModule {

}
