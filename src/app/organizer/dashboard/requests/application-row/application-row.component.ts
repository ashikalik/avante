import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Requests } from '../../../../models/requests';
import { RequestsService } from '../../../../api-services/requests.service';
import { RequestDetials } from '../../../../models/request-details';

@Component({
  selector: 'app-application-row',
  templateUrl: './application-row.component.html',
  styleUrls: ['./application-row.component.scss']
})
export class ApplicationRowComponent implements OnInit {

  public requestDetails: RequestDetials;
  public showInfo: boolean;
  @Input() eventkey: string;
  @Input() request: Requests;
  @Output() onPreAcceptRequest: EventEmitter<any> = new EventEmitter();
  
  constructor(private requestsService: RequestsService) {
    this.showInfo = false;

  }

  ngOnInit() {
  }



  public onShowInfo(request_id: number) {
    this.showInfo = !this.showInfo;

    if (this.showInfo) {
      this.getRequestDetails(request_id);
    }
  }



  public getRequestDetails(requestid: number) {
    this.requestDetails = null;
    this.requestsService.viewRequest(requestid, this.eventkey).subscribe(
      res => {
        this.requestDetails = res;
      }, err => {

      });
  }

  public onPreAcceptRequestButton(event){
    this.onPreAcceptRequest.emit(event)
  }


}
