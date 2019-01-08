import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


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




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AboutUsModule,
    AuthModule,
    BuyTicketModule,
    CalendarModule,
    ContactUsModule,
    FaqModule,
    HomeModule,
    MyProfileModule,
    OrganizerModule,
    SearchEventsModule,
    ViewEventModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
