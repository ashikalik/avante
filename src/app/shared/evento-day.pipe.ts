import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'eventoDay'
})
export class EventoDayPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        const day = new Date(value).getUTCDate();
        return day;
    }

}
