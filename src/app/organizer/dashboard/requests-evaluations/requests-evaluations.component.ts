import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-requests-evaluations',
  templateUrl: './requests-evaluations.component.html',
  styleUrls: ['./requests-evaluations.component.scss']
})
export class RequestsEvaluationsComponent implements OnInit {

  constructor(public router: Router,
    private route: ActivatedRoute,
    
  ) { }

  ngOnInit() {

  }


  public viewInterview() {
    this.router.navigate([ '../interview', 1 ], { relativeTo: this.route });  
  }

}
