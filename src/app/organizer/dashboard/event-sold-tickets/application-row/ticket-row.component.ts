import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Requests } from '../../../../models/requests';
import { RequestsService } from '../../../../api-services/requests.service';
import { RequestDetials } from '../../../../models/request-details';
import { Router, ActivatedRoute } from '@angular/router';
import { PrintBadge } from '../../../../services/print-badge.service';
import { TicketsService } from '../../../../api-services/tickets.service';

@Component({
  selector: 'app-ticket-row',
  templateUrl: './ticket-row.component.html',
  styleUrls: ['./ticket-row.component.scss']
})
export class TicketRowComponent implements OnInit {

  public ticketsList: any;
  public showInfo: boolean;
  @Input() invoice: any;
  @Input() eventkey: any;
  
  
  

  constructor(private requestsService: RequestsService,
    public router: Router,
    public PrintBadge: PrintBadge,
    private ticketsService: TicketsService,    
    private route: ActivatedRoute) {

    this.showInfo = false;
  }

  ngOnInit() {
  }



  public onShowInfo() {
    this.showInfo = !this.showInfo;

    if (this.showInfo) {
      this.getTicketDetails(this.invoice.invoice_id, this.eventkey);
    }
  }


  public getTicketDetails(invoice_id:number, eventkey: string) {
    this.ticketsService.getTicketDetails(invoice_id, eventkey).subscribe(
      res => {
        this.ticketsList = res;
      }, err => {
      
      });
  }

  public print(ticket: any) {
    console.log(this.ticketsList)
    let popupWin;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(this.PrintBadge.BuildInvoice(ticket));
    popupWin.document.close();
  }



}
