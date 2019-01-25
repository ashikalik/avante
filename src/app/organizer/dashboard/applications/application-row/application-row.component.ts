import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-application-row',
  templateUrl: './application-row.component.html',
  styleUrls: ['./application-row.component.scss']
})
export class ApplicationRowComponent implements OnInit {
  public showInfo: boolean;

  public showEdu: boolean;
  public showEx: boolean;
  public showSkills: boolean;
  
  constructor() {
    this.showInfo = false;

   }

  ngOnInit() {
  }


 
  public onShowInfo(){
    this.showInfo = !this.showInfo;
  }


}
