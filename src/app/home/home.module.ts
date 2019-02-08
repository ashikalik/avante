import {NgModule} from '@angular/core';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home/home.component';
import {CommonService} from "../api-services/common.service";
import {EventService} from "../api-services/event.service";
import {BASE_MODULES} from '../models/modules';

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        ...BASE_MODULES,
        HomeRoutingModule,
    ],
    providers: [
        CommonService,
        EventService
    ]
})
export class HomeModule {
}
