import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../core/user-auth.service';
import { UserProfile } from '../../models/user-profile';
import { SellerService } from '../../api-services/seller.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {

  public event_key: string;
  public profile: UserProfile;
  public invoicesList: any;

  public limit: number;
  public page: number;
  //for search requests
  public searchInput: any;
  public isPaymentOpend: boolean;
  

  constructor(
    public userAuthService: UserAuthService,
    public router: Router,    
    private route: ActivatedRoute,      
    public sellerService: SellerService,
  ) {

    this.searchInput = null;
    this.page = 1;
    this.isPaymentOpend = false;
    

    let profile = this.userAuthService.getUserProfile();
    this.event_key = profile.data.event_key;

  }

  ngOnInit() {
    this.getInvoicesList();
    this.getEventDetail();
  }


  public getInvoicesList() {
    this.sellerService.listInvoices(this.page, this.searchInput).subscribe(res => {
      this.invoicesList = res;
    }, err => {
    }
    );
  }

public addTicket(){
  this.router.navigate(['../add-ticket'], { relativeTo: this.route });
}

public addCosmosTicket(){
  this.router.navigate(['../cosmo-ticket'], { relativeTo: this.route });  
}


public getEventDetail() {
  this.sellerService.viewEventDetails(this.event_key).subscribe(
    res => {
      //to check if the payment is opned or not
      if (res.data.details.ticket_payment == 1) {
        this.isPaymentOpend = true;
      } else {
        this.isPaymentOpend = false;
      }
    })
}


  goToPage(n: number): void {
    this.page = n;
    this.getInvoicesList();
  }

  onNext(): void {
    this.page++;
    this.getInvoicesList();
  }

  onPrev(): void {
    this.page--;
    this.getInvoicesList();
  }

  public search() {
    this.page = 1;
    this.getInvoicesList();

  }
}
