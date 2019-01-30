import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Requests } from '../../../models/requests';
import { RequestsService } from '../../../api-services/requests.service';
import { EventoError } from '../../../models/error';

@Component({
  selector: 'app-requests-rating',
  templateUrl: './requests-rating.component.html',
  styleUrls: ['./requests-rating.component.scss']
})
export class RequestsRatingComponent implements OnInit {

  public requestList: Requests;
  public limit: number;
  public page: number;
  public meta: any;
  public event_key: string;
  public error: EventoError;
  
  //for search requests
  public searchInput: any;


  constructor(public router: Router,
    private requestsService: RequestsService,
    public activatedRoute: ActivatedRoute,
    private route: ActivatedRoute) {

      this.limit = 20;
      this.page = 1;
      this.searchInput = null;
      
      this.activatedRoute.parent.params.subscribe(params => {
        this.event_key = params['event-key']
      });


     }

  ngOnInit() {
    this.getRatingList();
  }


  public getRatingList() { 
    this.requestList = null;
    this.error = null;
    this.requestsService.getFinalRating(this.event_key).subscribe(
      res => {
        this.requestList = res;
        console.log(this.requestList);
      }, err => {
        this.error = err.value.error;
        
      });
  }
}
