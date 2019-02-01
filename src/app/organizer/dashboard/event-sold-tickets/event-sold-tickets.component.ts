import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketsService } from '../../../api-services/tickets.service';

@Component({
  selector: 'app-event-sold-tickets',
  templateUrl: './event-sold-tickets.component.html',
  styleUrls: ['./event-sold-tickets.component.scss']
})
export class EventSoldTicketssComponent implements OnInit {


  public limit: number;
  public page: number;
  public meta: any;
  //for search requests
  public searchInput: any;


  public event_key: string;
  public ticketsList: any;

  constructor(private ticketsService: TicketsService,
    public activatedRoute: ActivatedRoute) { 
    this.searchInput = null;

    this.page = 1;

    this.activatedRoute.parent.params.subscribe(params => {
      this.event_key = params['event-key']
    });

  }

  ngOnInit() {
    this.getTickets();
    
  }


  public getTickets() {
    this.ticketsList = null;    
    this.ticketsService.getTicketList(this.page, this.event_key, this.searchInput).subscribe(
        res => { 
            this.ticketsList = res;
        }, err => {

        }
    );
}


goToPage(n: number): void {
  this.page = n;
  this.getTickets();
}

onNext(): void {
  this.page++;
  this.getTickets();
}

onPrev(): void {
  this.page--;
  this.getTickets();
}

public search() {
  this.page = 1;
  this.getTickets();

}


}
