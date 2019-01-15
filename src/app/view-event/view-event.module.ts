import { NgModule } from '@angular/core';
import { ViewEventRoutingModule } from './view-event-routing.module';
import { RootComponent } from './root/root.component';
import { EventService } from "../api-services/event.service";
import { AgmCoreModule } from '@agm/core';
import { CountdownTimerModule } from "ngx-countdown-timer";
import { EventHeaderComponent } from './event-header/event-header.component';
import { EventDescriptionComponent } from './event-description/event-description.component';
import { EventRolesComponent } from './event-roles/event-roles.component';
import { EventTicketsComponent } from './event-tickets/event-tickets.component';
import { BASE_MODULES } from '../models/modules';

@NgModule({
    declarations: [RootComponent, EventHeaderComponent, EventDescriptionComponent, EventRolesComponent, EventTicketsComponent],
    imports: [
        ...BASE_MODULES,
        ViewEventRoutingModule,
        AgmCoreModule,
        CountdownTimerModule.forRoot(),
    ],
    providers: [
        EventService
    ]
})
export class ViewEventModule {


}
