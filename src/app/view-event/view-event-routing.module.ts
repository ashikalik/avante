import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ViewEventComponent} from "./view-event/view-event.component";

const routes: Routes = [
    {
        path: ':id',
        component: ViewEventComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewEventRoutingModule { }
