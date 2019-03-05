import { Pipe, PipeTransform } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Pipe({
  name: 'minMaxPrice'
})
export class MinMaxPricePipe implements PipeTransform {

  public Free: string;
  public SR: string;

  constructor(private translate: TranslateService) {

      this.translate.get('Free').subscribe((res: string) => {
          this.Free = res;
      });
      this.translate.get('SR').subscribe((res: string) => {
          this.SR = res;
      });


  }

  transform(value: any, args?: any): any {
    if(value.length === 1) {
      if(value[0].price === 0)
        return this.Free;
      else
        return value[0].price + `${this.SR}`
    } else {
      if(value[0].price === 0 && value[value.length - 1].price === 0) {
          return this.Free;
      } else if(value[0].price != value[value.length - 1].price) {
          if(value[0].price === 0) {
              return ` ${this.Free} - ${value[value.length - 1].price} ${this.SR}`
          } else {
              return `${value[0].price} ${this.SR} - ${value[value.length - 1].price} ${this.SR}`
          }
      } else {
          return `${value[0].price} ${this.SR}`
      }
    }
  }

}
