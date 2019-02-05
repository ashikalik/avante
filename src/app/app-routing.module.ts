import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


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
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule',   
  },
  {
    path: 'terms&conditions',
    loadChildren: './terms-conditions/terms-conditions.module#TermsConditionsModule',   
  },
  {
      path: 'seller',
      loadChildren: './seller/seller.module#SellerModule',       
  },
  // {
  //     path: 'supervisor',
  //     loadChildren: './supervisor/supervisor.module#SupervisorModule',               
  //     canActivate:[AuthGuardService],        
  //     canActivateChild: [AuthGuardService],

  // },
  // {
  //     path: '**',
  //     component: PageNotFoundComponent
  // }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
