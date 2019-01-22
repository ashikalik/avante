import {Pipe, PipeTransform} from '@angular/core';
import {LanguageSettingService} from "../core/language-setting.service";

@Pipe({
    name: 'eventoMonth'
})
export class EventoMonthPipe implements PipeTransform {

    public  monthEN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    public  monthAR = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
        "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
    ];

    constructor(public languageSettingService: LanguageSettingService) {

    }


    transform(value: any, args?: any): any {
        const month = new Date(value).getUTCMonth();

        if(this.languageSettingService.getLanguage() == 'en') {
            return this.monthEN[month];
        } else {
            // console.log(this.monthAR[month])
            return this.monthAR[month];
        }
    }

}
