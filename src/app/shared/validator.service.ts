import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AbstractControl, ValidationErrors } from "@angular/forms";


@Injectable()
export class ValidatorService {

    constructor() {

    }

    public checkDate(AC: AbstractControl): ValidationErrors {
        if (AC.value.from_date && AC.value.end_date) {
            const from_date = AC.value.from_date.formatted;
            const end_date = AC.value.end_date.formatted;

            if (from_date && end_date) {

                if (from_date > end_date) {
                    return { dateError: { valid: false } };
                } else {
                    return null;
                }
            }
        }

    }


    public checkTime(AC: AbstractControl): ValidationErrors { 
        if (AC.get('from_time').value != null && AC.get('end_time').value != null) {
            const from_time = AC.get('from_time').value;
            const end_time = AC.get('end_time').value;
            const from_date_type = AC.get('from_time_type').value;
            const end_date_type = AC.get('end_time_type').value;


            if (from_date_type == 'am' && end_date_type == 'pm') {
                console.log('true 1')
                return null
            } else if (from_date_type == 'pm' && end_date_type == 'am') {
                console.log('error 1')
                return { timeError: { valid: false } };
            } else {
                if (Number(from_time.split(':')[0]) > Number(end_time.split(':')[0])) {
                    console.log('error 2')
                    return { timeError: { valid: false } };
                } else if (Number(from_time.split(':')[0]) === Number(end_time.split(':')[0])) {
                    if (Number(from_time.split(':')[1]) >= Number(end_time.split(':')[1])) {
                        console.log('error 3')
                        return { timeError: { valid: false } };
                    } else {
                        console.log('true 2')
                        return null;
                    }
                }
            }
        }


    }



}