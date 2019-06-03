import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Observable } from "rxjs";
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyDatePickerOptions } from 'src/app/models/date-picker-object';


@Component({
    selector: 'app-ticket-info',
    templateUrl: './ticket-info.component.html',
    styleUrls: ['./ticket-info.component.scss']
})
export class TicketInfoComponent implements OnInit {
    @Output() onNext: EventEmitter<any> = new EventEmitter();
    @Output() onBack: EventEmitter<any> = new EventEmitter();
    @Input() payment: FormGroup;
    public myDatePickerOptions = MyDatePickerOptions;

    
    constructor() {
    }

    onChangeDateBirth(event) {
        console.log(event)
        this.payment.get('dateOfBirthGregorian').setValue(event.formatted);
    }


    ngOnInit() {
    }


    onButtonNext(){
        this.onNext.emit();        
    }

    onButtonBack(){
        this.onBack.emit();        
    }

}
