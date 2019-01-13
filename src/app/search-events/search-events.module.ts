import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {CommonService} from "../api-services/common.service";
import {NetworkLayerModule} from "../network-layer/network-layer.module";
import {EventService} from "../api-services/event.service";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';


import { SearchEventsRoutingModule } from './search-events-routing.module';
import { SearchEventComponent } from './search-event/search-event.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { EventListComponent } from './event-list/event-list.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [SearchEventComponent, SearchBarComponent, EventListComponent],
  imports: [
    CommonModule,
    SearchEventsRoutingModule,
    CommonModule,
    HttpClientModule,
    NetworkLayerModule,
    FormsModule,
    NgxPaginationModule,
    TranslateModule.forChild({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    })
],
providers: [
    CommonService,
    EventService
]
})
export class SearchEventsModule { }
