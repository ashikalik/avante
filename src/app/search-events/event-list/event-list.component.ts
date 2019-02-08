import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  @Input() searchResult :any;
  
  constructor() { }

  ngOnInit() {
  }

}
