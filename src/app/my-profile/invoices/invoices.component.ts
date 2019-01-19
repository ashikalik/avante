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

    constructor(public profileService: ProfileService) { }

    ngOnInit() {
        this.getInvoices();
    }


    public getInvoices() {
        this.profileService.getInvoices().subscribe(res => {
            console.log(res);
            this.invoices = res;
        } , err => {
            console.log(err)
        })
    }

}
