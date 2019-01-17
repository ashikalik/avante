import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactUsRoutingModule} from './contact-us-routing.module';
import {ContactUsComponent} from './contact-us/contact-us.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ContactUsService} from "../api-services/contact-us.service";
import {BASE_MODULES} from "../models/modules";

@NgModule({
    declarations: [ContactUsComponent],
    imports: [
        CommonModule,
        ContactUsRoutingModule,
        ReactiveFormsModule,
        ...BASE_MODULES
    ],
    providers: [
        ContactUsService
    ]
})
export class ContactUsModule {
}
