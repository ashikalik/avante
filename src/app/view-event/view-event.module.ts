import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ViewEventRoutingModule} from './view-event-routing.module';
import {RootComponent} from './root/root.component';
import {EventService} from "../api-services/event.service";
import {NetworkLayerModule} from "../network-layer/network-layer.module";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {AgmCoreModule} from '@agm/core';
import {SharedModule} from "../shared/shared.module";
import {CountdownTimerModule} from "ngx-countdown-timer";
import {EventHeaderComponent} from './event-header/event-header.component';
import {EventDescriptionComponent} from './event-description/event-description.component';
import {EventRolesComponent} from './event-roles/event-roles.component';
import {EventTicketsComponent} from './event-tickets/event-tickets.component';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [RootComponent, EventHeaderComponent, EventDescriptionComponent, EventRolesComponent, EventTicketsComponent],
    imports: [
        CommonModule,
        ViewEventRoutingModule,
        HttpClientModule,
        NetworkLayerModule,
        AgmCoreModule,
        SharedModule,
        CountdownTimerModule.forRoot(),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        EventService
    ]
})
export class ViewEventModule {


}
