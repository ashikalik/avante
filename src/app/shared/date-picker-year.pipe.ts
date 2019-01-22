import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'datePickerYear'
})
export class DatePickerYear implements PipeTransform {

    constructor() {
    }


    transform(value: any, args?: any): any {
        let date = moment(value,"YYYY-MM-DD").year()
        return date;
    }

}
