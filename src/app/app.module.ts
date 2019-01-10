import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AboutUsModule} from './about-us/about-us.module';
import {AuthModule} from './auth/auth.module';
import {BuyTicketModule} from './buy-ticket/buy-ticket.module';
import {CalendarModule} from './calendar/calendar.module';
import {ContactUsModule} from './contact-us/contact-us.module';
import {FaqModule} from './faq/faq.module';
import {MyProfileModule} from './my-profile/my-profile.module';
import {OrganizerModule} from './organizer/organizer.module';
import {SearchEventsModule} from './search-events/search-events.module';
import {ViewEventModule} from './view-event/view-event.module';
import {CoreModule} from "./core/core.module";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

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
        AboutUsModule,
        AuthModule,
        BuyTicketModule,
        CalendarModule,
        ContactUsModule,
        FaqModule,
        MyProfileModule,
        OrganizerModule,
        SearchEventsModule,
        ViewEventModule,
        CoreModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
