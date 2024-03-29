import { PrintBadge } from './../../../services/print-badge.service';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { SellerService } from '../../../api-services/seller.service';
import * as moment from 'moment'; // add this 1 of 4

@Component({
  selector: 'app-ticket-row',
  templateUrl: './ticket-row.component.html',
  styleUrls: ['./ticket-row.component.scss']
})
export class TicketRowComponent implements OnInit {

  public showInfo: boolean;
  @Input() invoice: any;

  public ticketList: any;

  constructor(
    public sellerService: SellerService,
    public PrintBadge: PrintBadge
  ) { }

  ngOnInit() {
  }


  public onShowInfo(invoice_id: number) {
    this.showInfo = !this.showInfo;

    if (this.showInfo) {
      this.listTickets(invoice_id);
    }
  }

  public listTickets(invoice_id) {
    this.sellerService.listTickets(invoice_id).subscribe(
      res => {
        this.ticketList = res;
      }, err => {
      
      });
  }


  public print(ticket: any) {
      let date = moment(new Date(), "YYYY-MM-DD").format("YYYY-MM-DD HH:MM");
        console.log(ticket);
        console.log(date)
        
        let popupWin;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write(this.PrintBadge.BuildInvoiceForCosmos(ticket, date));
        popupWin.document.close();
  } 
}
