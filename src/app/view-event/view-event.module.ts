import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewEventRoutingModule } from './view-event-routing.module';
import { ViewEventComponent } from './view-event/view-event.component';

@NgModule({
  declarations: [ViewEventComponent],
  imports: [
    CommonModule,
    ViewEventRoutingModule
  ]
})
export class ViewEventModule { }
