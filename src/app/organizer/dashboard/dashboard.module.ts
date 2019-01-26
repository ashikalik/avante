import { NgModule } from '@angular/core';
import { RootComponent } from './root/root.component';
import { BASE_MODULES } from "../../models/modules";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { EventDetailsComponent } from "./event-details/event-details.component";
import { EventSettingsComponent } from "./event-settings/event-settings.component";
import { EventTermsComponent } from "./event-terms/event-terms.component";
import { EventSupervisorsComponent } from "./event-supervisors/event-supervisors.component";
import { OrganizerService } from "../../api-services/organizer.service";
import { AgmCoreModule } from "@agm/core";
import { QuestionsComponent } from './questions/questions.component';
import { RequestsComponent } from './requests/requests.component';
import { RequestsEvaluationsComponent } from './requests-evaluations/requests-evaluations.component';
import { RequestsFinalEvaluationsComponent } from './requests-final-evaluations/requests-final-evaluations.component';
import { LinkWithGeaComponent } from "./link-with-gea/link-with-gea.component";
import { ApplicationRowComponent } from './requests/application-row/application-row.component';
import { ApplicationCvComponent } from './requests/application-cv/application-cv.component';
import { RequestsInterviewComponent } from './requests-interview/requests-interview.component';
import { RequestsRatingComponent } from './requests-rating/requests-rating.component';
import { EventReportComponent } from './event-report/event-report.component';
import { SellerRowComponent } from './event-report/seller-row/seller-row.component';
import { SellerDetailsComponent } from './event-report/seller-details/seller-details.component';
import { SupervisorRowComponent } from './event-supervisors/supervisor-row/supervisor-row.component';


@NgModule({
    declarations: [
        RootComponent,
        EventDetailsComponent,
        EventSettingsComponent,
        EventTermsComponent,
        EventSupervisorsComponent,
        QuestionsComponent,
        RequestsComponent,
        RequestsEvaluationsComponent,
        RequestsFinalEvaluationsComponent,
        ApplicationRowComponent,
        ApplicationCvComponent,
        RequestsFinalEvaluationsComponent,
        LinkWithGeaComponent,
        RequestsInterviewComponent,
        RequestsRatingComponent,
        EventReportComponent,
        SellerRowComponent,
        SellerDetailsComponent,
        SupervisorRowComponent
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
