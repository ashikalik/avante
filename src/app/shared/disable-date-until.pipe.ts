import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'disableDateUntil'
})
export class DisableDateUntilPipe implements PipeTransform {

    constructor() {
    }


    transform(value: any, args?: any): any {

        let date;
        let from_date;
        let today = moment(new Date()).format("YYYY-MM-DD");

        if (moment(value).isBefore(today)) {
            from_date = moment(today, "YYYY-MM-DD").subtract(1, 'days').format("YYYY-MM-DD");
        } else {
            from_date = moment(value, "YYYY-MM-DD").subtract(1, 'days').format("YYYY-MM-DD");
        }

        from_date = from_date.split('-');

        let formDateObj = {
            year: parseInt(from_date[0]),
            month: parseInt(from_date[1]),
            day: parseInt(from_date[2])
        };

        return formDateObj;
    }

}
