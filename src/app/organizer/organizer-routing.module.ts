import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PricesComponent} from './prices/prices.component';
import {AddEventComponent} from './add-event/add-event.component';
import {MyEventsComponent} from './my-events/my-events.component';
import {RootOrganizerComponent} from "./root-organizer/root-organizer.component";
import { OrganizerSupervisorGuard } from '../shared/auth-guards/organizer-supervisor.guard';
import { OrganizerGuard } from '../shared/auth-guards/organizer-guard';

const routes: Routes = [
    {
        path: '',
        component: RootOrganizerComponent,
        children: [
            {
                path: '',
                redirectTo: 'my-events',
                pathMatch: 'full'
            },
            {
                path: 'my-events',
                component: MyEventsComponent,
                canActivate: [ OrganizerGuard],
                
            },
            {
                path: 'create-event',
                component: AddEventComponent,
                canActivate: [ OrganizerGuard],
                
            },
            {
                path: 'event/:event-key',
                loadChildren: './dashboard/dashboard.module#DashboardModule',
                canActivate: [ OrganizerSupervisorGuard],
                
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrganizerRoutingModule {
}
