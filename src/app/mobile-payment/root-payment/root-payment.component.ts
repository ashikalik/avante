import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BuyTicketService } from '../../api-services/buy-ticket.service';
import { NetworkConfig } from '../../network-layer/network.config';
import { DeviceDetectorService } from 'ngx-device-detector';

declare var Checkout: any;

@Component({
  selector: 'app-root-payment',
  templateUrl: './root-payment.component.html',
  styleUrls: ['./root-payment.component.scss']
})
export class RootPaymentComponent implements OnInit {

  public reference: string;
  loadAPI: Promise<any>;
  deviceInfo = null;
  isMobile = null;
  isTablet = null;
  isDesktopDevice = null;

  public showDownload: boolean = false;



  constructor(private route: ActivatedRoute,
    private renderer: Renderer2,
    public router: Router,
    private deviceService: DeviceDetectorService,
    public buyTicketService: BuyTicketService) {
    this.reference = this.route.snapshot.queryParams.reference;
      
  }

  ngOnInit() {
    this.addJsToElement(NetworkConfig.MERCHANT_JS).onload = () => {
      this.validateBrowser();
    }

  }

  addJsToElement(src: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    this.renderer.appendChild(document.body, script);
    return script;
  }

  public redirectUser() {
    if (this.reference) {
      this.buyTicketService.getMobileInvoice(this.reference).subscribe(
        res => {
          if (res.data.status_id === 3 && res.data.total_with_vat > 0) {
            Checkout.configure({
              merchant: NetworkConfig.MERCHANT_ID,
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

  public validateBrowser() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
    this.isDesktopDevice = this.deviceService.isDesktop();
    if (!this.isMobile && this.deviceInfo.browser != 'Unknown') {
       this.redirectUser()
    } else {
      this.showDownload = true;
    }
}




}
