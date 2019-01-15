import {Component, Input, OnInit} from '@angular/core';
import {Policy} from "../../models/event-details";

@Component({
  selector: 'app-event-roles',
  templateUrl: './event-roles.component.html',
  styleUrls: ['./event-roles.component.scss']
})
export class EventRolesComponent implements OnInit {

  @Input() policy: Policy[];

  constructor() { }

  ngOnInit() {
  }

}
