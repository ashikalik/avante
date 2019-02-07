import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Request } from '../../../../models/requests';
import { RequestsService } from '../../../../api-services/requests.service';
import { RequestDetials } from '../../../../models/request-details';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-application-row',
  templateUrl: './application-row.component.html',
  styleUrls: ['./application-row.component.scss']
})
export class ApplicationRowComponent implements OnInit {

  public requestDetails: RequestDetials;
  public showInfo: boolean;
  @Input() eventkey: string;
  @Input() request: Request;
  @Output() onPreAcceptRequest: EventEmitter<any> = new EventEmitter();
  @Output() onUpdateRequests: EventEmitter<any> = new EventEmitter();



  constructor(private requestsService: RequestsService,
    public router: Router,
    private route: ActivatedRoute) {

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
    this.requestsService.getRequestDetails(requestid, this.eventkey).subscribe(
      res => {
        this.requestDetails = res;
      }, err => {

      });
  }

  public rejectRequest(request_id) {
    this.requestsService.reject(request_id, this.eventkey).subscribe(
      res => {
        this.onUpdateRequest();
      }, err => {

      });
  }


  public finalAccept(request_id) {
    this.requestsService.finalAccept(request_id, this.eventkey).subscribe(
      res => {
        this.onUpdateRequest();
      }, err => {

      });
  }

  public onPreAcceptRequestButton(event) {
    this.onPreAcceptRequest.emit(event)
  }


  public onUpdateRequest() {
    this.onUpdateRequests.emit();
  }

  public viewInterview(request_id) {
    this.router.navigate(['../interview', request_id], { relativeTo: this.route });
  }


}
