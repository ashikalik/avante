import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Requests } from '../../../models/requests';
import { RequestsService } from '../../../api-services/requests.service';
import { EventoError } from '../../../models/error';

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
  public error: EventoError;
  
  //for search requests
  public request_status  = [
  { status: 'الكل', key: '' },
  { status: 'قبول نهائي', key: '3' },
  { status: 'تم مقابلته', key: '5' }
];
  public searchInput: any;
  public status: any;
  

  constructor(public router: Router,
    private requestsService: RequestsService,
    public activatedRoute: ActivatedRoute,
    private route: ActivatedRoute) {

      this.page = 1;
      this.status = '';
      this.searchInput = null;

      this.activatedRoute.parent.params.subscribe(params => {
        this.event_key = params['event-key']
      });


     }

  ngOnInit() {
    this.getRatingList();
  }


  public viewInterview(request_id: number) {
    this.router.navigate([ '../interview', request_id ], { relativeTo: this.route });  
  }



  public getRatingList() {
    this.error = null;    
    this.requestList = null;
    this.requestsService.getRatingList(this.event_key, this.page, this.status,  this.searchInput).subscribe(
      res => {
        this.requestList = res;



      }, err => {
        this.error = err.value.error;
        
      });
  }

  goToPage(n: number): void {
    this.page = n;
    this.getRatingList();
  }
  
  onNext(): void {
    this.page++;
    this.getRatingList();
  }
  
  onPrev(): void {
    this.page--;
    this.getRatingList();
  }
  
  public search() {
    this.page = 1;
    this.getRatingList();
  
  }
}
