import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MyProfileRoutingModule} from './my-profile-routing.module';
import {RootComponent} from './root/root.component';
import {UserComponent} from './user/user.component';
import {VoluComponent} from './volu/volu.component';
import {BASE_MODULES} from "../models/modules";
import {SingleTicketComponent} from './single-ticket/single-ticket.component';
import {ProfileService} from "../api-services/profile.service";
import {InvoicesComponent} from './invoices/invoices.component';
import {SingleInvoiceComponent} from './single-invoice/single-invoice.component';
import {TicketsComponent} from './tickets/tickets.component';
import {BioComponent} from './bio/bio.component';
import {SkillsComponent} from './skills/skills.component';
import {EducationComponent} from './education/education.component';
import {ExperienceComponent} from './experience/experience.component';
import {CommonService} from "../api-services/common.service";

@NgModule({
    declarations: [
        RootComponent,
        UserComponent,
        VoluComponent,
        SingleTicketComponent,
        InvoicesComponent,
        SingleInvoiceComponent,
        TicketsComponent,
        BioComponent,
        SkillsComponent,
        EducationComponent,
        ExperienceComponent
    ],
    imports: [
        CommonModule,
        MyProfileRoutingModule,
        ...BASE_MODULES
    ],
    providers: [
        ProfileService,
        CommonService
    ]
})
export class MyProfileModule {
}
