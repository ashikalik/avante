import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Observable } from "rxjs";
import { EventDetails, Package } from "../../models/event-details";
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  @Input() payment: FormGroup;
  @Output() onNext: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }


  onButtonNext(){
    this.onNext.emit();        
}


}
