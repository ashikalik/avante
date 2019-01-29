import {NgModule} from '@angular/core';
import {OrganizerRoutingModule} from './organizer-routing.module';
import {PricesComponent} from './prices/prices.component';
import {MyEventsComponent} from './my-events/my-events.component';
import {AddEventComponent} from './add-event/add-event.component';
import {EventBadgeComponent} from './event-badge/event-badge.component';
import {TicketPackagesComponent} from './ticket-packages/ticket-packages.component';
import {SoldTicketsComponent} from './sold-tickets/sold-tickets.component';
import {OrganizerRootComponent} from './organizer-root/organizer-root.component';
import {BASE_MODULES} from '../models/modules';
import {CommonService} from '../api-services/common.service';
import {EventService} from '../api-services/event.service';
import {RootOrganizerComponent} from './root-organizer/root-organizer.component';


@NgModule({
    declarations: [
        PricesComponent,
        MyEventsComponent,
        AddEventComponent,
        EventBadgeComponent,
        TicketPackagesComponent,
        SoldTicketsComponent,
        OrganizerRootComponent,
        RootOrganizerComponent
    ],
    imports: [
        ...BASE_MODULES,
        OrganizerRoutingModule
    ],
    providers: [
        CommonService,
        EventService
    ]
})
export class OrganizerModule {
}
