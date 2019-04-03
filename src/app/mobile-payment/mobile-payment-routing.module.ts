import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RootPaymentComponent } from './root-payment/root-payment.component';

const routes: Routes = [
  {
    path: '',
    component: RootPaymentComponent,
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobilePaymentRoutingModule { }
