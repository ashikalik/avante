import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../../api-services/profile.service";
import {Invoices} from "../../models/my-ticket";

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

    public invoices: Invoices;
    public limit: number;
    public page: number;


    constructor(public profileService: ProfileService) { }

    ngOnInit() {
        this.limit = 20;
        this.page = 1;
        this.getInvoices();
    }


    public getInvoices() {
        this.profileService.getInvoices(this.limit, this.page).subscribe(res => {
            this.invoices = res;
            console.log(this.invoices)
        } , err => {
        })
    }

    goToPage(n: number): void {
        this.page = n;
        this.getInvoices();
      }
      
      onNext(): void {
        this.page++;
        this.getInvoices();
      }
      
      onPrev(): void {
        this.page--;
        this.getInvoices();
      }

}
