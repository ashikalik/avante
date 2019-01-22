import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'disableDateSince'
})
export class DisableDateSincePipe implements PipeTransform {

    constructor() {
    }


    transform(value: any, args?: any): any {

        let end_date;
        end_date = moment(value, "YYYY-MM-DD").add(1, 'days').format("YYYY-MM-DD");

        end_date = end_date.split('-');

        let formDateObj = {
            year: parseInt(end_date[0]),
            month: parseInt(end_date[1]),
            day: parseInt(end_date[2])
        };

        return formDateObj;
    }

}
