import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchEventComponent } from '../search-events/search-event/search-event.component';

const routes: Routes = [
  {
      path: '',
      component: SearchEventComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchEventsRoutingModule { }
