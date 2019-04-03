import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BuyTicketService } from 'src/app/api-services/buy-ticket.service';
declare var Checkout: any;

@Component({
  selector: 'app-root-payment',
  templateUrl: './root-payment.component.html',
  styleUrls: ['./root-payment.component.scss']
})
export class RootPaymentComponent implements OnInit {

  public reference: string;

  constructor(private route: ActivatedRoute,
              public router: Router,
              public buyTicketService: BuyTicketService) { 
    this.reference = this.route.snapshot.queryParams.reference;
    
  }

  ngOnInit() {
    if(this.reference) {
      this.buyTicketService.getMobileInvoice(this.reference).subscribe(
        res => {
          if(res.data.status_id === 3 && res.data.total_with_vat > 0) {
            Checkout.configure({
              merchant: '3000000016',
              order: {
                  amount: res.data.total_with_vat,
                  currency: 'SAR',
                  description: res.data.event_name,
                  id: res.data.reference
              },
              session: {
                  id: res.data.session
              },
              interaction: {
                  merchant: {
                      name: 'Evento ايفينتو',
                      logo: 'https://i.ibb.co/BGDvmqs/Logo-PNG-1-copy.png'
                  },
                  locale: 'ar_SA',
                  theme: 'default',
                  displayControl: {
                      billingAddress: 'HIDE',
                      customerEmail: 'HIDE',
                      orderSummary: 'HIDE',
                      shipping: 'HIDE'
                  }
              }
          });

          Checkout.showPaymentPage()

          } else {
            this.router.navigate(['/home']);
          }
        }, err => {

        }
      );
    } else {
      this.router.navigate(['/home']);
    }
  }

}
