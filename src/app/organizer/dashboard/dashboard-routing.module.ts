import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RootComponent} from "./root/root.component";
import {EventDetailsComponent} from "./event-details/event-details.component";

const routes: Routes = [
    {
        path: '',
        component: RootComponent,
        children: [
            {
                path: '',
                component: EventDetailsComponent
            },
            {
                path: 'details',
                component: EventDetailsComponent
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
