import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.scss']
})
export class PricesComponent implements OnInit {

  @Output() onAgree: EventEmitter<any> = new EventEmitter();

  public agreement: FormGroup;

  public isOnBackageOne: boolean;
  public isOnBackageTwo: boolean;


  constructor(public formBuilder: FormBuilder,
    public router: Router) {
    this.isOnBackageOne = false;
    this.isOnBackageTwo = false;

  }

  ngOnInit() {
    this.initForm();
  }


  onBox(value: any) {
    if (value == 1) {
      this.isOnBackageOne = true;
      this.isOnBackageTwo = false;
    } if (value == 2) {
      this.isOnBackageOne = false;
      this.isOnBackageTwo = true;
    } if (value == 3) {
      this.isOnBackageOne = false;
      this.isOnBackageTwo = false;
    }
  }



  public initForm() {
    this.agreement = this.formBuilder.group(
      {
        'agreement': [null, Validators.compose([Validators.required])],
      });
  }


  public onContinue(event) {
    this.onAgree.emit();
  }

}
