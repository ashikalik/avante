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
                component: EventDetailsComponent
            },
            {
                path: 'setting',
                component: EventSettingsComponent
            },
            {
                path: 'terms',
                component: EventTermsComponent
            },
            {
                path: 'link-gea',
                component: LinkWithGeaComponent
            },
            {
                path: 'supervisors',
                component: EventSupervisorsComponent
            },
            {
                path: 'report',
                component: EventReportComponent
            },
            {
                path: 'questions',
                component: QuestionsComponent
            },
            {
                path: 'requests',
                component: RequestsComponent
            },
            {
                path: 'evaluations',
                component: RequestsEvaluationsComponent
            },
            {
                path: 'final-evaluations',
                component: RequestsFinalEvaluationsComponent
            },
            {
                path: 'final-rating',
                component: RequestsRatingComponent 
            },
            {
                path: 'interview/:request-id',
                component: RequestsInterviewComponent 
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
