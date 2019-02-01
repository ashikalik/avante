import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Requests } from '../../../models/requests';
import { RequestsService } from '../../../api-services/requests.service';

@Component({
  selector: 'app-requests-evaluations',
  templateUrl: './requests-evaluations.component.html',
  styleUrls: ['./requests-evaluations.component.scss']
})
export class RequestsEvaluationsComponent implements OnInit {

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

      this.page = 1;
      this.searchInput = null;
      
      this.activatedRoute.parent.params.subscribe(params => {
        this.event_key = params['event-key']
      });


     }

  ngOnInit() {
    this.getPreacceptedList();
  }


  public viewInterview(request_id: number) {
    this.router.navigate([ '../interview', request_id ], { relativeTo: this.route });  
  }



  public getPreacceptedList() {
    this.requestList = null;
    this.requestsService.getPreAcceptedList(this.event_key, this.page, this.searchInput).subscribe(
      res => {
        this.requestList = res;
        console.log(this.requestList);
      }, err => {

      });
  }


  goToPage(n: number): void {
    this.page = n;
    this.getPreacceptedList();
  }
  
  onNext(): void {
    this.page++;
    this.getPreacceptedList();
  }
  
  onPrev(): void {
    this.page--;
    this.getPreacceptedList();
  }
  
  public search() {
    this.page = 1;
    this.getPreacceptedList();
  
  }

}
