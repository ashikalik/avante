import {NgModule} from '@angular/core';
import {OrganizerRoutingModule} from './organizer-routing.module';
import {PricesComponent} from './prices/prices.component';
import {MyEventsComponent} from './my-events/my-events.component';
import {AddEventComponent} from './add-event/add-event.component';
import {EventBadgeComponent} from './event-badge/event-badge.component';
import {TicketPackagesComponent} from './ticket-packages/ticket-packages.component';
import {OrganizerRootComponent} from './organizer-root/organizer-root.component';
import {BASE_MODULES} from '../models/modules';
import {CommonService} from '../api-services/common.service';
import {EventService} from '../api-services/event.service';
import {RootOrganizerComponent} from './root-organizer/root-organizer.component';
import {AgmCoreModule} from "@agm/core";


@NgModule({
    declarations: [
        PricesComponent,
        MyEventsComponent,
        AddEventComponent,
        EventBadgeComponent,
        TicketPackagesComponent,
        OrganizerRootComponent,
        RootOrganizerComponent
    ],
    imports: [
        ...BASE_MODULES,
        OrganizerRoutingModule,
        AgmCoreModule
    ],
    providers: [
        CommonService,
        EventService
    ]
})
export class OrganizerModule {
}
