import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Observable } from "rxjs";
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
    selector: 'app-ticket-info',
    templateUrl: './ticket-info.component.html',
    styleUrls: ['./ticket-info.component.scss']
})
export class TicketInfoComponent implements OnInit {
    @Output() onNext: EventEmitter<any> = new EventEmitter();
    @Output() onBack: EventEmitter<any> = new EventEmitter();
    @Input() payment: FormGroup;
    
    constructor() {
    }

    ngOnInit() {
    }


    onButtonNext(){
        console.log(this.payment)        
        this.onNext.emit();        
    }

    onButtonBack(){
        console.log(this.payment)        
        this.onBack.emit();        
    }

}
