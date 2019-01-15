import {Component, Input, OnInit} from '@angular/core';
import {Package} from "../../models/event-details";

@Component({
  selector: 'app-event-tickets',
  templateUrl: './event-tickets.component.html',
  styleUrls: ['./event-tickets.component.scss']
})
export class EventTicketsComponent implements OnInit {


  @Input() ticket: Package;
  public show: boolean;

  constructor() {
    this.show = false;
  }

  ngOnInit() {
  }

  public showMore() {
    this.show = !this.show;
  }

}
