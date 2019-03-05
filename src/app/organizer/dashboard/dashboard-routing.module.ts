import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RootComponent } from "./root/root.component";
import { EventDetailsComponent } from "./event-details/event-details.component";
import { QuestionsComponent } from './questions/questions.component';
import { RequestsComponent } from './requests/requests.component';
import { RequestsEvaluationsComponent } from './requests-evaluations/requests-evaluations.component';
import { RequestsFinalEvaluationsComponent } from './requests-final-evaluations/requests-final-evaluations.component';
import { RequestsRatingComponent } from './requests-rating/requests-rating.component';
import { RequestsInterviewComponent } from './requests-interview/requests-interview.component';
import {EventSettingsComponent} from "./event-settings/event-settings.component";
import {EventTermsComponent} from "./event-terms/event-terms.component";
import {LinkWithGeaComponent} from "./link-with-gea/link-with-gea.component";
import {EventReportComponent} from "./event-report/event-report.component";
import {EventSupervisorsComponent} from "./event-supervisors/event-supervisors.component";
import { EventSoldTicketssComponent} from "./event-sold-tickets/event-sold-tickets.component";
import {EventSalesComponent} from "./event-sales/event-sales.component";
import {EventPackagesComponent} from "./event-packages/event-packages.component";
import { OrganizerSupervisorGuard } from '../../shared/auth-guards/organizer-supervisor.guard';
import { OrganizerGuard } from '../../shared/auth-guards/organizer-guard';
import { SupervisorRequestsGuard } from '../../shared/auth-guards/supervisor-requests.guard';
import { SupervisorSellersGuard } from '../../shared/auth-guards/supervisor-sellers.guard';


const routes: Routes = [
    {
        path: '',
        component: RootComponent,
        children: [
            {
                path: '',
                redirectTo: 'details',
                pathMatch: 'full'
            },
            {
                path: 'details',
                component: EventDetailsComponent,
                canActivate: [ OrganizerSupervisorGuard],
                
            },
            {
                path: 'setting',
                component: EventSettingsComponent,
                canActivate: [ OrganizerGuard],
                
            },
            {
                path: 'terms',
                component: EventTermsComponent,
                canActivate: [ OrganizerGuard],
                
            },
            {
                path: 'link-gea',
                component: LinkWithGeaComponent,
                canActivate: [ OrganizerGuard],
                
            },
            {
                path: 'supervisors',
                component: EventSupervisorsComponent,
                canActivate: [ OrganizerGuard],
                
            },
            {
                path: 'sales',
                component: EventSalesComponent,
                canActivate: [ SupervisorSellersGuard]                
            },
            {
                path: 'packages',
                component: EventPackagesComponent,
                canActivate: [ OrganizerGuard],                
            },
            {
                path: 'report',
                component: EventReportComponent,
                canActivate: [ OrganizerGuard],
                
            },
            {
                path: 'questions',
                component: QuestionsComponent,
                canActivate: [ SupervisorRequestsGuard ],
                
            },
            {
                path: 'requests',
                component: RequestsComponent,
                canActivate: [ SupervisorRequestsGuard],                
            },
            {
                path: 'evaluations',
                component: RequestsEvaluationsComponent,
                canActivate: [ SupervisorRequestsGuard]                
            },
            {
                path: 'final-evaluations',
                component: RequestsFinalEvaluationsComponent,
                canActivate: [ SupervisorRequestsGuard]              
            },
            {
                path: 'final-rating',
                component: RequestsRatingComponent ,
                canActivate: [ OrganizerGuard]                
            },
            {
                path: 'interview/:request-id',
                component: RequestsInterviewComponent,
                canActivate: [ SupervisorRequestsGuard]                              
            },
            {
                path: 'sold-tickets',
                component: EventSoldTicketssComponent,
                canActivate: [ OrganizerGuard],
                
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {
}
