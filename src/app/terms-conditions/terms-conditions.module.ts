import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsConditionsRoutingModule } from './terms-conditions-routing.module';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { BASE_MODULES } from '../models/modules';

@NgModule({
  declarations: [TermsConditionsComponent],
  imports: [
    ...BASE_MODULES,    
    CommonModule,
    TermsConditionsRoutingModule
  ]
})
export class TermsConditionsModule { }
