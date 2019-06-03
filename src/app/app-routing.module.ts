import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/auth-guards/auth-guard';
import { SellerGuard } from './shared/auth-guards/seller-guard';
import { OrganizerGuard } from './shared/auth-guards/organizer-guard';
import { SupervisorRequestsGuard } from './shared/auth-guards/supervisor-requests.guard';
import { OrganizerSupervisorGuard } from './shared/auth-guards/organizer-supervisor.guard';
import { LoggedGuard } from './shared/auth-guards/logged-guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule',
  },
  {
    path: 'about-us',
    loadChildren: './about-us/about-us.module#AboutUsModule',
  },
  {
    path: 'buy-ticket',
    loadChildren: './buy-ticket/buy-ticket.module#BuyTicketModule',
  },
  {
    path: 'cosmos',
    loadChildren: './cosmos/cosmos.module#CosmosModule',
  },
  {
    path: 'calendar',
    loadChildren: './calendar/calendar.module#CalendarModule',
  },
  {
    path: 'contact-us',
    loadChildren: './contact-us/contact-us.module#ContactUsModule',
  },
  {
    path: 'faq',
    loadChildren: './faq/faq.module#FaqModule',
  },
  {
    path: 'my-profile',
    loadChildren: './my-profile/my-profile.module#MyProfileModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'search',
    loadChildren: './search-events/search-events.module#SearchEventsModule',
  },
  {
    path: 'event',
    loadChildren: './view-event/view-event.module#ViewEventModule',
  },
  {
    path: 'organizer',
    loadChildren: './organizer/organizer.module#OrganizerModule',   
    canActivate: [AuthGuard, OrganizerSupervisorGuard],
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule',  
    canActivate: [LoggedGuard],
  },
  {
    path: 'terms&conditions',
    loadChildren: './terms-conditions/terms-conditions.module#TermsConditionsModule',   
  },
  {
    path: 'validate-payment',
    loadChildren: './validate-payment/validate-payment.module#ValidatePaymentModule',   
  },
  {
    path: 'validate-payment-mobile',
    loadChildren: './validate-payment-mobile/validate-payment-mobile.module#ValidatePaymentMobileModule',   
  },
  {
    path: 'mobile-payment',
    loadChildren: './mobile-payment/mobile-payment.module#MobilePaymentModule',   
  },
  {
      path: 'seller',
      loadChildren: './seller/seller.module#SellerModule',   
      canActivate: [AuthGuard, SellerGuard],
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
