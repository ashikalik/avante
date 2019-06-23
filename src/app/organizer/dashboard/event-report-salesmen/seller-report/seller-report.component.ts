import { Component, OnInit, Input } from '@angular/core';
import { OrganizerService } from '../../../../api-services/organizer.service';
import { CommonService } from '../../../../api-services/common.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seller-report',
  templateUrl: './seller-report.component.html',
  styleUrls: ['./seller-report.component.scss']
})
export class SellerReportComponent implements OnInit {
  public event_key: string;
  public page: number;
  @Input() seller_id: number;
  public payments: any;

  constructor(public organizerService: OrganizerService,
    public commonService: CommonService,
    public activatedRoute: ActivatedRoute) {
    this.activatedRoute.parent.params.subscribe(params => {
      this.event_key = params['event-key']
    })


  }

  ngOnInit() {
    console.log(this.seller_id)
    this.getSellerSales();
  }


  public getSellerSales() {
    console.log(this.seller_id)

    this.organizerService.getSellerPayment(this.seller_id, this.event_key).subscribe(
        res => {
            this.payments = res.data;
        }, err => {

        }
    );

}


}
