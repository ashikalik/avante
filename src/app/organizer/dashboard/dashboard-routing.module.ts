import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RootComponent } from "./root/root.component";
import { EventDetailsComponent } from "./event-details/event-details.component";
import { QuestionsComponent } from './questions/questions.component';
import { ApplicationsComponent } from './applications/applications.component';
import { InterviewResultsComponent } from './interview-results/interview-results.component';
import { EvaluationsComponent } from './evaluations/evaluations.component';
import { FinalEvaluationsComponent } from './final-evaluations/final-evaluations.component';


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
                path: 'questions',
                component: QuestionsComponent
            },
            {
                path: 'applications',
                component: ApplicationsComponent
            },
            {
                path: 'evaluations',
                component: EvaluationsComponent
            },
            {
                path: 'interview-results',
                component: InterviewResultsComponent
            },
            {
                path: 'final-evaluations',
                component: FinalEvaluationsComponent
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
