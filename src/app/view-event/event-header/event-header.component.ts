import {Component, Input, OnInit, Output,EventEmitter} from '@angular/core';
import {EventDetails} from "../../models/event-details";
import {UserAuthService} from "../../core/user-auth.service";
import { EventoError } from 'src/app/models/error';

@Component({
  selector: 'app-event-header',
  templateUrl: './event-header.component.html',
  styleUrls: ['./event-header.component.scss']
})
export class EventHeaderComponent implements OnInit {

  @Input() eventDetails: EventDetails;
  @Input() requestError: EventoError;
  @Output() onSubmitRequest: EventEmitter<any> = new EventEmitter();
  

  
  public userType: number;

  constructor(public userAuthService: UserAuthService) {
    let profile = this.userAuthService.getUserProfile();
    if (profile){
      this.userType = profile.data.user_type;
      
    }
  }

  ngOnInit() {
  }

  public submitRequest(){
    this.onSubmitRequest.emit();
  }

}
