import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  public setps: boolean[];

  constructor() {
    this.setps = [true , false , false , false];
  }

  ngOnInit() {
  }



  public changeStep(event: any) {

  }

}
