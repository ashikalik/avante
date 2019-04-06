import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BuyTicketService } from 'src/app/api-services/buy-ticket.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  public reference: string;
  public validate: boolean;

  constructor(public buyTicketService: BuyTicketService,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.reference = params['reference'];
      // this.validatePayment();
  });

  }

  ngOnInit() {
    // window.close();
  }


  // public validatePayment() {
  //   this.buyTicketService.validatePayment(this.reference).subscribe(res => {
  //     this.validate = true;
  //   }, err => {
  //     this.validate = false;
  //   });
  // }

}
