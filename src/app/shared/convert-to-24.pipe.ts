import {Pipe, PipeTransform} from '@angular/core';


@Pipe({name: 'convertFrom24To12Format'})
export class ConvertTo24 implements PipeTransform {
    transform(time: any, type: any): any {
        let hour = (time.split(':'))[0]
        let min = (time.split(':'))[1];

        if(type === 'pm'){
            hour = parseInt(hour) + 12;
            if(hour === 24) {
                hour = '00';
                min = '01';
            }
        }

        return `${hour}:${min}`
    }
}