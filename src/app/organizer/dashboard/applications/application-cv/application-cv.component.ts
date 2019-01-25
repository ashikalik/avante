import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-application-cv',
  templateUrl: './application-cv.component.html',
  styleUrls: ['./application-cv.component.scss']
})
export class ApplicationCvComponent implements OnInit {


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
