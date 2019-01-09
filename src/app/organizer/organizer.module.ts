import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizerRoutingModule } from './organizer-routing.module';
import { PricesComponent } from './prices/prices.component';
import { MyEventsComponent } from './my-events/my-events.component';
import { AddEventComponent } from './add-event/add-event.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventSettingsComponent } from './event-settings/event-settings.component';
import { EventTermsComponent } from './event-terms/event-terms.component';
import { EventBadgeComponent } from './event-badge/event-badge.component';
import { EventSupervisorsComponent } from './event-supervisors/event-supervisors.component';
import { LinkWithGeaComponent } from './link-with-gea/link-with-gea.component';
import { QuestionsComponent } from './questions/questions.component';
import { ApplicationsComponent } from './applications/applications.component';
import { InterviewResultsComponent } from './interview-results/interview-results.component';
import { EvaluationsComponent } from './evaluations/evaluations.component';
import { FinalEvaluationsComponent } from './final-evaluations/final-evaluations.component';
import { TicketPackagesComponent } from './ticket-packages/ticket-packages.component';
import { SalesStaffComponent } from './sales-staff/sales-staff.component';
import { SoldTicketsComponent } from './sold-tickets/sold-tickets.component';
import { OrganizerRootComponent } from './organizer-root/organizer-root.component';



@NgModule({
  declarations: [
    PricesComponent,
    MyEventsComponent,
    AddEventComponent,
    EventDetailsComponent,
    EventSettingsComponent,
    EventTermsComponent,
    EventBadgeComponent,
    EventSupervisorsComponent,
    LinkWithGeaComponent,
    QuestionsComponent,
    ApplicationsComponent,
    InterviewResultsComponent,
    EvaluationsComponent,
    FinalEvaluationsComponent,
    TicketPackagesComponent,
    SalesStaffComponent,
    SoldTicketsComponent,
    OrganizerRootComponent
  ],
  imports: [
    CommonModule,
    OrganizerRoutingModule
  ]
})
export class OrganizerModule { }
