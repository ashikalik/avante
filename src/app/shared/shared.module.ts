import { ConvertTo24 } from './convert-to-24.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventoDatePipe } from './evento-date.pipe';
import { EventoTimePipe } from './evento-time.pipe';
import { CoreModule } from "../core/core.module";
import { EventoDayPipe } from './evento-day.pipe';
import { EventoMonthPipe } from './evento-month.pipe';
import { MinMaxPricePipe } from './min-max-price.pipe';
import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { ErrorsComponent } from './errors/errors.component';
import { MobilePipe } from './mobile.pipe';
import { DisableDateUntilPipe } from './disable-date-until.pipe';
import { DisableDateSincePipe } from './disable-date-since.pipe';
import { DatePickerYear } from './date-picker-year.pipe';
import { DatePickerInputPipe } from './date-picker-input.pipe';
import { ConvertFrom24To12FormatPipe } from './convert-from24-to12-format.pipe';
import { AmPmTimePipe } from './am-pm-time.pipe';
import { PaginationComponent } from './pagination-component/pagination.component';
import { ValidatorService } from './validator.service';
import { TruncatePipe } from './truncate.pipe';
import { AuthGuard } from './auth-guards/auth-guard';
import { SellerGuard } from './auth-guards/seller-guard';
import { OrganizerGuard } from './auth-guards/organizer-guard';
import { SupervisorRequestsGuard } from './auth-guards/supervisor-requests.guard';
import { OrganizerSupervisorGuard } from './auth-guards/organizer-supervisor.guard';
import { SupervisorSellersGuard } from './auth-guards/supervisor-sellers.guard';


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
        AmPmTimePipe,
        PaginationComponent,
        TruncatePipe,
        ConvertTo24
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
        AmPmTimePipe,
        PaginationComponent,
        TruncatePipe,
        ConvertTo24
    ],
    providers: [
        ValidatorService,
        AuthGuard,
        SellerGuard,
        OrganizerGuard,
        OrganizerSupervisorGuard,
        SupervisorRequestsGuard,
        SupervisorSellersGuard
    ]
})
export class SharedModule {

}
