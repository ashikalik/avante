import { Component, OnInit, Renderer2 } from '@angular/core';
import { Validators, FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventoError } from '../../models/error';
import { MyDatePickerOptions } from '../../models/date-picker-object';
import { NetworkConfig } from '../../network-layer/network.config';
import { CosmosService } from '../../../app/api-services/cosoms.service';
import { PrintBadge } from './../../services/print-badge.service';

@Component({
  selector: 'app-cosmo-ticket',
  templateUrl: './cosmo-ticket.component.html',
  styleUrls: ['./cosmo-ticket.component.scss']
})
export class CosmoTicketComponent implements OnInit {


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
  // public showSubmit: boolean;


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
  public selectPaymentType: boolean;
  public createInvoiceSellerRes: any;
  public showPrint: boolean;



  constructor(public cosmosService: CosmosService,
    public activatedRout: ActivatedRoute,
    public router: Router,
    public PrintBadge: PrintBadge,   
    private renderer: Renderer2,
    public formBuilder: FormBuilder,
  ) {
    // this.showSubmit = false;
    this.isReqPackage = false;
    this.isSonger = false;
    this.selectPaymentType = false;
    this.showPrint = false;

    this.activatedRout.params.subscribe(params => {
      this.eventKey = '214611584';
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
    this.showPrint = false;
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
    this.isLessThanFive = false;
  }

  public onViewTicketInfo() {
    this.isOnViewCategoriesTimes = false;
    this.isOnTicketInfo = true;
  }

  public onBackToTicketInfo() {
    this.isOnTicketInfo = true;
    this.isOnTicketReview = false
  }

  public onReviewInfo() {
    this.isOnTicketInfo = false;
    this.isOnTicketReview = true;
    // this.addJsToElement(NetworkConfig.MERCHANT_JS).onload = () => {
    //   this.showSubmit = true;
    // }
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

    this.cosmosService.validatePackage(selectedPackage.package_id, '214611584').subscribe(res => {
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
        'audienceGender': ['', Validators.compose([Validators.required])]
      });
  }



  onChangeDateBirth(event) {
    this.payment.get('dateOfBirthGregorian').setValue(event.formatted);
  }


  public buyTicket() {
    this.errorsBuyTicket = null;
    this.paymentType = null;
    this.tickets = null;

    this.cosmosService.createInvoiceSeller(this.payment.value, this.eventKey).subscribe(
      res => {
        this.isOnTicketReview = false;
        this.selectPaymentType = true;
        this.createInvoiceSellerRes = res;
        // this.createInvoiceSellerRes.data.reference = res;
        console.log(this.createInvoiceSellerRes)
      }, err => {
        this.errorsBuyTicket = err.value.error;
      })
  }



  public paymentType: any;
  public tickets: any;
  
  public onChangePaymentType(type: any){
    console.log(type)
    this.paymentType = type;
  }

  public confirmPayment(paymentType: any) {
    console.log(paymentType);
    this.cosmosService.confirmPayment(this.createInvoiceSellerRes.data.reference, this.paymentType).subscribe(
      res => {
        this.showPrint = true;
        this.selectPaymentType = false
        this.tickets = res.data;
      }, err => {

      });
  }

  public print(ticket: any) {
    console.log(ticket)
    let popupWin;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(this.PrintBadge.BuildInvoiceForCosmos(ticket));
    popupWin.document.close();
  }

}


