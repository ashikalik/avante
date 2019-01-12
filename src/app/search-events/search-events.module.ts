import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchEventsRoutingModule } from './search-events-routing.module';
import { SearchEventComponent } from './search-event/search-event.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { EventListComponent } from './event-list/event-list.component';

@NgModule({
  declarations: [SearchEventComponent, SearchBarComponent, EventListComponent],
  imports: [
    CommonModule,
    SearchEventsRoutingModule
  ]
})
export class SearchEventsModule { }
