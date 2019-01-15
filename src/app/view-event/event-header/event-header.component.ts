import {Component, Input, OnInit} from '@angular/core';
import {EventDetails} from "../../models/event-details";

@Component({
  selector: 'app-event-header',
  templateUrl: './event-header.component.html',
  styleUrls: ['./event-header.component.scss']
})
export class EventHeaderComponent implements OnInit {

  @Input() eventDetails: EventDetails;

  constructor() { }

  ngOnInit() {
  }

}
