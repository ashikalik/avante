import { Component, OnInit, Renderer2 } from '@angular/core';
import { CosmosService } from '../../../app/api-services/cosoms.service';
import { EventoError } from '../../../app/models/error';
import { MyDatePickerOptions } from '../../../app/models/date-picker-object';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NetworkConfig } from '../../network-layer/network.config';

declare var Checkout: any;


@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {


  public isSonger: boolean;
  public isReqPackage: boolean;

  public isOnViewMainPackages: boolean;
  public isOnViewMainCategories: boolean;
  public isOnViewCategoriesTimes: boolean;
  public isOnTicketInfo: boolean;
  public isOnTicketReview: boolean;
  public isOnSuccess: boolean;

  public selectedSonger: any;
  public selectedCategory: any;
  public eventKey: any;
  public payment: FormGroup;

  public isSoldOut: boolean = false;
  public isLessThanFive: boolean = false;
  public isDateRequired: boolean;
  public package: any;
  public validatePackageRes: any;
  public total: number;
  public numbOfTickets: number;
  public cosmosOffer: boolean;
  public errorsValidatePackage: EventoError;
  public totalWithoutVat: number;
  public totalWithVAT: number;
  public VAT: number;
  public errorsBuyTicket: EventoError;
  public completedPayment: boolean;
  public showSubmit:boolean;


  public packages: any;
  public selectPackage: any;
  public selectPackageSonger: any;
  public showNumbers: any;
  public maleCount: any;
  public famleCount: any;
  public childCount: any;
  public dateOfBirthGregorian: any;
  public audienceGender: any;
  public validateRes: any;
  public validateErr: EventoError;
  public showSoldOut: any;
  public myDatePickerOptions = MyDatePickerOptions;



  constructor(public cosmosService: CosmosService,
    public activatedRout: ActivatedRoute,
    public router: Router,
    private renderer: Renderer2,
    public formBuilder: FormBuilder,
  ) {
    this.showSubmit = false;
    this.isReqPackage = false;
    this.isSonger = false;

    this.activatedRout.params.subscribe(params => {
      this.eventKey = params['id'];
    });

    
  }

  addJsToElement(src: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    this.renderer.appendChild(document.body, script);
    return script;
  }

  ngOnInit() {
    
    this.getPackages();
  }


  public getPackages() {
    this.cosmosService.getEventPackages().subscribe(res => {
      this.isOnViewMainPackages = true;
      this.packages = res;
    }, err => {

    });
  }


  public selectPackageFunc(p: any) {
    this.isOnViewMainPackages = false;
    this.isReqPackage = true;
    this.isSonger = false;
    this.selectPackage = p;
    this.selectedTime(this.selectPackage);
  }


  public selectPackageSongerFunc(p: any) {
    this.isOnViewMainPackages = false;
    this.isSonger = true;
    this.isReqPackage = false;
    this.selectedSonger = p;
    this.onViewCategories();
  }

  public onBackToEvent() {
    this.router.navigate(['/event/' + this.eventKey]);
  }

  public onViewCategories() {
    this.isOnViewMainPackages = false;
    this.isOnViewMainCategories = true;
  }

  public onBackToMainPackages() {
    this.isSonger = false;
    this.isReqPackage = false;
    this.isOnViewMainPackages = true;
  }

  public selectCategory(c: any) {
    this.isOnViewMainCategories = false;
    this.isOnViewCategoriesTimes = true;
    this.selectedCategory = c;

  }

  public onBackToCategories() {
    this.isOnViewMainCategories = true;
    this.isOnViewCategoriesTimes = false;
    this.validatePackageRes = null;
    this.errorsValidatePackage = null;
  }

  public onViewTicketInfo() {
    this.isOnViewCategoriesTimes = false;
    this.isOnTicketInfo = true;
  }

  public onBackToTicketInfo(){
    this.isOnTicketInfo = true;
    this.isOnTicketReview = false
    }

  public onReviewInfo() {
    this.isOnTicketInfo = false;
    this.isOnTicketReview = true;
    this.addJsToElement(NetworkConfig.MERCHANT_JS).onload = () => {
      this.showSubmit = true;
    }
  }


  public selectedTime(sp: any) {
    this.validatePackage(sp);
    this.initForm();
    this.onChangePackage(sp)

  }

  public onBackToTimeOrMainPackages() {
    if (this.isSonger) {
      this.isOnViewCategoriesTimes = true;
      this.isOnTicketInfo = false;
    } else {
      this.onBackToMainPackages();
    }
    this.validatePackageRes = null;
    this.errorsValidatePackage = null;
    this.isLessThanFive = false;
    this.isSoldOut = false;
    this.cosmosOffer = false;
  }


  onChangePackage(selectedPackage) {

    this.payment.get('maleCount').setValue('');
    this.payment.get('femaleCount').setValue('');
    this.payment.get('childCount').setValue('');
    this.payment.get('num_ticket').setValue('');
    this.payment.updateValueAndValidity();

    this.package = selectedPackage;
    this.payment.get('package_id').setValue(this.package.package_id);
    if (this.package.package_id == 51) {
      this.cosmosOffer = true;
    } else {
      this.cosmosOffer = false;
    }

    //this.calcuateTotal();
  }


  public validatePackage(selectedPackage: any) {
    //to rest this value once this value is changed
    this.validatePackageRes = null;
    this.errorsValidatePackage = null;
    this.isLessThanFive = false;
    this.isSoldOut = false;

    this.cosmosService.validatePackage(selectedPackage.package_id, this.eventKey).subscribe(res => {
      this.validatePackageRes = res.data;
      if (this.validatePackageRes.left <= 0) {
        this.isSoldOut = true;
      }
      if (this.validatePackageRes.left <= 5 && this.validatePackageRes.left >= 1) {
        this.isLessThanFive = true;
      }
      if (this.validatePackageRes.left > 0) {
        this.onViewTicketInfo();
      }
    }, err => {
      this.errorsValidatePackage = err.value.error;
    })
  }


  public calculatTotal() {
    this.totalWithoutVat = (this.payment.get('num_ticket').value * this.package.price);
    // this.VAT = (this.payment.get('num_ticket').value * this.package.price) * 0.05;
    // this.totalWithVAT = (this.payment.get('num_ticket').value * this.package.price) * 1.05;
  }

  onChangeNumOfTickets(event) {
    this.numbOfTickets = Number(this.payment.get('maleCount').value) + Number(this.payment.get('femaleCount').value) + Number(this.payment.get('childCount').value);
    this.payment.get('num_ticket').setValue(this.numbOfTickets);
    
    this.calculatTotal();
  }

  public initForm() {
    this.numbOfTickets = 0;
    this.payment = this.formBuilder.group(
      {
        'first_name': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(40)])],
        'last_name': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(40)])],
        'mobile': ['', Validators.compose([Validators.required, Validators.pattern('^(05)([0-9]{8})$')])],
        'email': ['', Validators.compose([Validators.required, Validators.email])],
        'package_id': ['', Validators.compose([Validators.required])],
        'num_ticket': ['', Validators.compose([Validators.required])],
        'maleCount': [''],
        'femaleCount': [''],
        'childCount': [''],
        'dateOfBirthGregorian': ['', Validators.compose([Validators.required])],
        'audienceGender': ['', Validators.compose([Validators.required])],
        'recaptcha': [null, Validators.compose([Validators.required])]
      });
  }



  onChangeDateBirth(event) {
    this.payment.get('dateOfBirthGregorian').setValue(event.formatted);
  }


  public buyTicket() {
    this.errorsBuyTicket = null;

    this.cosmosService.createInvoice(this.payment.value, this.eventKey).subscribe(
      res => {
        // this is for free ticket to show success payment
        if (res.data.price == 0 && res.data.total_with_vat == 0) {
          this.completedPayment = true;
          this.router.navigate(['/validate-payment/' + res.data.reference])
        } else {
          // this.completedPayment = false;
          // this.changeStepForward(null);
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

        }

      }, err => {
        this.errorsBuyTicket = err.value.error;
      })
  }

}
