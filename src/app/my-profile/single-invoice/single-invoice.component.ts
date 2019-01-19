import {Component, Input, OnInit} from '@angular/core';
import {Invoice} from "../../models/my-ticket";

@Component({
  selector: 'app-single-invoice',
  templateUrl: './single-invoice.component.html',
  styleUrls: ['./single-invoice.component.scss']
})
export class SingleInvoiceComponent implements OnInit {

  @Input() invoice: Invoice;
  public showMore: boolean;

  constructor() {
    this.showMore = false;
  }

  ngOnInit() {
  }

  public onShow() {
    this.showMore = !this.showMore;
  }

}
