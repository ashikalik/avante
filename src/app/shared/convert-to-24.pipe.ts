import {Pipe, PipeTransform} from '@angular/core';


@Pipe({name: 'convertFrom24To12Format'})
export class ConvertTo24 implements PipeTransform {
    transform(time: any, type: any): any {
        let hour = (time.split(':'))[0]
        let min = (time.split(':'))[1];
        console.log(hour)
        console.log(min)
        console.log(type)

        if(type === 'pm'){
            console.log(parseInt(hour))
            hour = parseInt(hour) + 12;
            if(hour === 24) {
                hour = '00';
                min = '01';
            }
        }

        console.log(`${hour}:${min}`);
        return `${hour}:${min}`
    }
}