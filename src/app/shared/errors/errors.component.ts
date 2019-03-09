import {Component, Input, OnInit} from '@angular/core';
import {EventoError} from "../../models/error";

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss']
})
export class ErrorsComponent implements OnInit {

  @Input() errors: EventoError

  constructor() { }

  ngOnInit() {
  }

}
