import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amPmTime'
})
export class AmPmTimePipe implements PipeTransform {

    transform(time: any): any {
        let hour = (time.split(':'))[0]
        let part = hour > 12 ? 'pm' : 'am';
        return `${part}`
    }

}
