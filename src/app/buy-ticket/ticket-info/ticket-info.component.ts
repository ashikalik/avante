import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Observable } from "rxjs";
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyDatePickerOptions } from '../../models/date-picker-object';
import {IMyDpOptions} from 'mydatepicker';


@Component({
    selector: 'app-ticket-info',
    templateUrl: './ticket-info.component.html',
    styleUrls: ['./ticket-info.component.scss']
})
export class TicketInfoComponent implements OnInit {
    @Output() onNext: EventEmitter<any> = new EventEmitter();
    @Output() onBack: EventEmitter<any> = new EventEmitter();
    @Input() payment: FormGroup;

    
    public datePicker: IMyDpOptions = {
        dateFormat: 'yyyy-mm-dd',
        editableDateField: false,
        firstDayOfWeek: 'su',       //to set the first day of the week
        sunHighlight: false,        //to unhighlight sundays
        alignSelectorRight: true,    //to align the arrow to the right
        openSelectorOnInputClick: true,  //open the datepicker once the input is selected
    };


    
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
