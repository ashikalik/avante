import {NgModule} from '@angular/core';
import {RootComponent} from './root/root.component';
import {BASE_MODULES} from "../../models/modules";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {EventDetailsComponent} from "./event-details/event-details.component";
import {EventSettingsComponent} from "./event-settings/event-settings.component";
import {EventTermsComponent} from "./event-terms/event-terms.component";
import {EventSupervisorsComponent} from "./event-supervisors/event-supervisors.component";
import {OrganizerService} from "../../api-services/organizer.service";
import {AgmCoreModule} from "@agm/core";

@NgModule({
    declarations: [
        RootComponent,
        EventDetailsComponent,
        EventSettingsComponent,
        EventTermsComponent,
        EventSupervisorsComponent
    ],
    imports: [
        ...BASE_MODULES,
        DashboardRoutingModule,
        AgmCoreModule,
    ],
    providers: [
        OrganizerService
    ]
})
export class DashboardModule {
}
