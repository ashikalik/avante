import { Component, OnInit ,Input} from '@angular/core';
import {Observable} from "rxjs";
import { LatestEvent } from "../../models/latest-event";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  @Input() latestEvent$ :Observable<LatestEvent>;   
  
  constructor() { }

  ngOnInit() {
  }

}
