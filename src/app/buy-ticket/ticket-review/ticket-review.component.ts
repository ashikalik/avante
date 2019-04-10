import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Observable } from "rxjs";
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BuyTicketService } from '../../api-services/buy-ticket.service';
import { EventDetails, Package } from "../../models/event-details";

@Component({
  selector: 'app-ticket-review',
  templateUrl: './ticket-review.component.html',
  styleUrls: ['./ticket-review.component.scss']
})
export class TicketReviewComponent implements OnInit {

  @Output() onBuyTickets: EventEmitter<any> = new EventEmitter();
  @Output() onBack: EventEmitter<any> = new EventEmitter();  
  @Input() payment: FormGroup;
  @Input() eventDetail: EventDetails;  
  
  public selectedPackage: Package;
  public isDateRequired: boolean;
  public totalWithoutVat: number;
  
  constructor(private buyTicketService: BuyTicketService) { }

  ngOnInit() {
    let package_id = this.payment.get('package_id').value;
    this.selectedPackage = this.eventDetail.data.packages.find(x => x.package_id == package_id); 
    this.isDateRequired = this.buyTicketService.isDateRequired(this.selectedPackage);    
    this.calculatTotal();
    let body = <HTMLDivElement> document.body;
    let script = document.createElement('script');
    script.innerHTML = '';
    script.src = 'https://test-gateway.mastercard.com/checkout/version/51/checkout.js';
    script.async = true;
    script.defer = true;
    body.appendChild(script);

  }

  public calculatTotal() {
    this.totalWithoutVat =  this.payment.get('num_ticket').value * this.selectedPackage.price;
}

  onBuyButton() {
    this.onBuyTickets.emit();
  }

  onButtonBack(){


    this.onBack.emit();        
}


}
