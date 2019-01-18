import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../../api-services/profile.service";

@Component({
  selector: 'app-my-ticket',
  templateUrl: './my-ticket.component.html',
  styleUrls: ['./my-ticket.component.scss']
})
export class MyTicketComponent implements OnInit {

  constructor(public profileService: ProfileService) { }

  ngOnInit() {
    this.getInvoices();
  }


  public getInvoices() {
    this.profileService.getInvoices().subscribe(res => {
      console.log(res);
    } , err => {
      console.log(err)
    })
  }

}
