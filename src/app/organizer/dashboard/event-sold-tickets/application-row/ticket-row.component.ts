import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Requests } from '../../../../models/requests';
import { RequestsService } from '../../../../api-services/requests.service';
import { RequestDetials } from '../../../../models/request-details';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ticket-row',
  templateUrl: './ticket-row.component.html',
  styleUrls: ['./ticket-row.component.scss']
})
export class TicketRowComponent implements OnInit {

  public requestDetails: RequestDetials;
  public showInfo: boolean;
  @Input() ticket: any;



  constructor(private requestsService: RequestsService,
    public router: Router,
    private route: ActivatedRoute) {

    this.showInfo = false;
  }

  ngOnInit() {
  }



  public onShowInfo() {
    this.showInfo = !this.showInfo;

  }



}
