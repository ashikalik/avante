import {Component, Input, OnInit} from '@angular/core';
import {Package} from "../../models/event-details";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-tickets',
  templateUrl: './event-tickets.component.html',
  styleUrls: ['./event-tickets.component.scss']
})
export class EventTicketsComponent implements OnInit {


  @Input() ticket: Package;
  public show: boolean;
  public eventKey: string;

  constructor(public activatedRout: ActivatedRoute) {
    this.show = false;
    this.activatedRout.params.subscribe(params => {
      this.eventKey = params['id'];
    });

  }

  ngOnInit() {
  }

  public showMore() {
    this.show = !this.show;
  }

}
