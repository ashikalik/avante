import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PricesComponent} from './prices/prices.component';
import {AddEventComponent} from './add-event/add-event.component';
import {MyEventsComponent} from './my-events/my-events.component';
import {RootOrganizerComponent} from "./root-organizer/root-organizer.component";

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
                component: MyEventsComponent
            },
            {
                path: 'prices',
                component: PricesComponent
            },
            {
                path: 'create-event',
                component: AddEventComponent
            },
            {
                path: 'event/:event-key',
                loadChildren: './dashboard/dashboard.module#DashboardModule',
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
