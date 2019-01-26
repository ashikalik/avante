import {Component, Input, OnInit} from '@angular/core';
import {Supervisor} from "../../../../models/supervisors";

@Component({
  selector: 'app-supervisor-row',
  templateUrl: './supervisor-row.component.html',
  styleUrls: ['./supervisor-row.component.scss']
})
export class SupervisorRowComponent implements OnInit {

  @Input() supervisor: Supervisor;
  public showDetails: boolean;
  public showUpdate: boolean;

  constructor() {
    this.showDetails = false;
    this.showUpdate = false;
  }

  ngOnInit() {
  }

  public onShowDetails() {
      this.showDetails = !this.showDetails;
  }
  public onUpdateSupervisor() {
      this.showUpdate = !this.showUpdate;
  }

  public close() {
    this.showDetails = false;
    this.showUpdate = false;
  }

}
