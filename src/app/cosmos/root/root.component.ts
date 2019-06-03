import { Component, OnInit } from '@angular/core';
import { CosmosService } from 'src/app/api-services/cosoms.service';
import { EventoError } from 'src/app/models/error';
import { MyDatePickerOptions } from 'src/app/models/date-picker-object';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

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
  public birthday: any;
  public total: any;
  public myDatePickerOptions = MyDatePickerOptions;
  public totalStatus: boolean;



  constructor(public cosmosService: CosmosService) { }

  ngOnInit() {
    this.getPackages();
  }


  public getPackages() {
    this.cosmosService.getEventPackages().subscribe(res => {
      this.packages = res;
    }, err => {

    });
  }


  public selectPackageFunc(p: any) {
    this.selectPackage = p;
    console.log(this.selectPackage)
  }


  public selectPackageSongerFunc(c: any) {
    this.selectPackageSonger = c;
    console.log(this.selectPackageSonger)
  }


  public showNumbersFunc(sp: any) {
    console.log(sp)
    this.showSoldOut = false;

    this.cosmosService.validatePackage(sp.package_id).subscribe(res => {
      this.validateRes = res;
      if(this.validateRes.data.left > 0) {
        this.showNumbers = true;
      } else {
        this.showSoldOut = true;
      }
      console.log(res)
    }, err => {
      this.validateErr =  err.value.error;
      
    });
  }


  onChangeDate(event) {
    this.birthday = event.formatted;
    console.log(this.birthday)
  }

  public onChangeNumOfMale(event) {
    this.maleCount = event;
    this.calculatTotal()
  }

  public onChangeNumOfFemale(event) {
    this.famleCount = event;
    this.calculatTotal();
  }

  public onChangeNumOfChildren(event) {
    this.childCount = event;
    this.calculatTotal();
  }

  public onChangeGender(event) {
    this.audienceGender = event;
  }

  public calculatTotal() {
    this.totalStatus = false;

    if(Number(this.maleCount) > 0  && Number(this.famleCount) > 0 && Number(this.childCount) > 0) {
      this.total = Number(this.maleCount) + Number(this.famleCount) + Number(this.childCount);
      console.log(this.total)
      console.log(this.validateRes.data.left)
      console.log(this.total <= this.validateRes.data.left)
      if(this.total <= this.validateRes.data.left) {
        this.totalStatus = true;
      } else {
        this.totalStatus = false;
      }
    } else {
      this.totalStatus = false;
    }

    
  }

}
