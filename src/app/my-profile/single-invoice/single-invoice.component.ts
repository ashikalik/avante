import {Component, Input, OnInit} from '@angular/core';
import {Invoice} from "../../models/my-ticket";
import {ProfileService} from "../../api-services/profile.service";
import {Tickets} from "../../models/tickets";

@Component({
  selector: 'app-single-invoice',
  templateUrl: './single-invoice.component.html',
  styleUrls: ['./single-invoice.component.scss']
})
export class SingleInvoiceComponent implements OnInit {

  @Input() invoice: Invoice;
  public showMore: boolean;
  public tickets: Tickets;

  constructor(public profileService: ProfileService) {
    this.showMore = false;
  }

  ngOnInit() {
  }

  public onShow() {
    if(!this.showMore) {
      let body = {
        invoice_id: this.invoice.invoice_id
      }
      this.profileService.getTickets(body).subscribe(res => {
        console.log(res);
        this.tickets = res;
      }, err => {

      })
    }
    this.showMore = !this.showMore;
  }

}
