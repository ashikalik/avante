import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AboutUsModule } from './about-us/about-us.module';
import { AuthModule } from './auth/auth.module';
import { BuyTicketModule } from './buy-ticket/buy-ticket.module';
import { CalendarModule } from './calendar/calendar.module';
import { ContactUsModule } from './contact-us/contact-us.module';
import { FaqModule } from './faq/faq.module';
import { HomeModule } from './home/home.module';
import { MyProfileModule } from './my-profile/my-profile.module';
import { OrganizerModule } from './organizer/organizer.module';
import { SearchEventsModule } from './search-events/search-events.module';
import { ViewEventModule } from './view-event/view-event.module';


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
    path: 'search-events',
    loadChildren: './search-events/search-events.module#SearchEventsModule',
  },
  {
    path: 'view-event',
    loadChildren: './view-event/view-event.module#ViewEventModule',
  },
  {
    path: 'organizer',
    loadChildren: './organizer/organizer.module#OrganizerModule',   
  },
  // {
  //     path: 'seller',
  //     loadChildren: './seller/seller.module#SellerModule',       
  //     canActivate:[AuthGuardService],        
  //     canActivateChild: [AuthGuardService],

  // },
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
