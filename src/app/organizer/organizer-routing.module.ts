import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PricesComponent } from './prices/prices.component';
import { AddEventComponent } from './add-event/add-event.component';
import { MyEventsComponent } from './my-events/my-events.component';

const routes: Routes = [
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

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizerRoutingModule { }
