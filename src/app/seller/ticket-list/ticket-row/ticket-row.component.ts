import { Component, OnInit, Input } from '@angular/core';
import { SellerService } from '../../../api-services/seller.service';

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
}
