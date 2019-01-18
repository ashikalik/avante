import {Component, Input, OnInit} from '@angular/core';
import {EventDetails} from "../../models/event-details";
import {UserAuthService} from "../../core/user-auth.service";

@Component({
  selector: 'app-event-header',
  templateUrl: './event-header.component.html',
  styleUrls: ['./event-header.component.scss']
})
export class EventHeaderComponent implements OnInit {

  @Input() eventDetails: EventDetails;
  public userType: number;

  constructor(public userAuthService: UserAuthService) {
    let profile = this.userAuthService.getUserProfile();
    this.userType = profile.data.user_type;
  }

  ngOnInit() {
  }

}
