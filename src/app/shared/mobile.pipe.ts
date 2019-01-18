import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mobile'
})
export class MobilePipe implements PipeTransform {

  transform(value: any, args?: any): any {
      // value = value.charAt(0);
      if(value.charAt(0) == '+'){
          value = '0' + value.slice(4, 13);
      }
      return value;
  }

}
