import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Requests } from '../../../models/requests';
import { RequestsService } from '../../../api-services/requests.service';

@Component({
  selector: 'app-requests-final-evaluations',
  templateUrl: './requests-final-evaluations.component.html',
  styleUrls: ['./requests-final-evaluations.component.scss']
})
export class RequestsFinalEvaluationsComponent implements OnInit {

  public requestList: Requests;
  public limit: number;
  public page: number;
  public meta: any;
  public event_key: string;
  
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
    this.getPreacceptedList();
  }


  public viewInterview() {
    this.router.navigate([ '../interview', 1 ], { relativeTo: this.route });  
  }



  public getPreacceptedList() {
    this.requestList = null;
    this.requestsService.getRatingList(this.event_key, this.limit, this.page, this.searchInput).subscribe(
      res => {
        this.requestList = res;
        console.log(this.requestList);
      }, err => {

      });
  }
}
