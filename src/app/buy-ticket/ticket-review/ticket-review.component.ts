import { Component, EventEmitter, OnInit, Output, Input, Renderer2 } from '@angular/core';
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
  public showSubmit: boolean;
  
  constructor(private buyTicketService: BuyTicketService, private renderer: Renderer2) { }

  ngOnInit() {
    this.showSubmit = false;
    let package_id = this.payment.get('package_id').value;
    this.selectedPackage = this.eventDetail.data.packages.find(x => x.package_id == package_id); 
    this.isDateRequired = this.buyTicketService.isDateRequired(this.selectedPackage);    
    this.calculatTotal();
    this.addJsToElement('https://test-gateway.mastercard.com/checkout/version/51/checkout.js').onload = () => {
      this.showSubmit = true;
    }


  }


  addJsToElement(src: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    this.renderer.appendChild(document.body, script);
    return script;
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
