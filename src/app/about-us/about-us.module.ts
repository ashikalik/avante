import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AboutUsRoutingModule} from './about-us-routing.module';
import {AboutUsComponent} from './about-us/about-us.component';
import {BASE_MODULES} from "../models/modules";

@NgModule({
    declarations: [AboutUsComponent],
    imports: [
        CommonModule,
        AboutUsRoutingModule,
        ...BASE_MODULES
    ]
})
export class AboutUsModule {
}
