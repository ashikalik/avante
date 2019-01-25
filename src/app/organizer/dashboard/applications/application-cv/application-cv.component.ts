import { Component, OnInit,Input } from '@angular/core';
import { RequestDetials } from '../../../../models/request-details';

@Component({
  selector: 'app-application-cv',
  templateUrl: './application-cv.component.html',
  styleUrls: ['./application-cv.component.scss']
})
export class ApplicationCvComponent implements OnInit {

  @Input() requestDetails: RequestDetials;
  
  public showEdu: boolean;
  public showEx: boolean;
  public showSkills: boolean;

  constructor() {
    this.showEdu = false;
    this.showEx = false;
    this.showSkills = false;
  }

  ngOnInit() {
  }


  public onShowEdu() {
    this.showEdu = !this.showEdu;
  }

  public onShowEx() {
    this.showEx = !this.showEx;
  }

  public onShowSkills() {
    this.showSkills = !this.showSkills;
  }

}
