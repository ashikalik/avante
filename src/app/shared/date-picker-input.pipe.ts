import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'datePickerInput'
})
export class DatePickerInputPipe implements PipeTransform {

    constructor() {
    }


    transform(value: any, args?: any): any {
        let input = value.split('-');

        let date = {
            year: parseInt(input[0]),
            month: parseInt(input[1]),
            day: parseInt(input[2])
        };


        return date;
    }

}