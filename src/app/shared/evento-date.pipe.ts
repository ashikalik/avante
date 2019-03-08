import {Pipe, PipeTransform} from '@angular/core';
import {LanguageSettingService} from "../core/language-setting.service";

@Pipe({
    name: 'eventoDate'
})
export class EventoDatePipe implements PipeTransform {

    constructor(public languageSettingService: LanguageSettingService) {

    }

    transform(value: any, args?: any): any {
        const date = new Date(value).toUTCString();



        if (this.languageSettingService.getLanguage() == 'en')
            return date;


        return String(date)
            .replace(/Sat/g, 'السبت')
            .replace(/Sun/g, 'الأحد')
            .replace(/Mon/g, 'الاثنين')
            .replace(/Tue/g, 'الثلاثاء')
            .replace(/Wed/g, 'الأربعاء')
            .replace(/Thu/g, 'الخميس')
            .replace(/Fri/g, 'الجمعة')
            .replace(/Jan/g, 'يناير')
            .replace(/Feb/g, 'فبراير')
            .replace(/Mar/g, 'مارس')
            .replace(/Apr/g, 'أبريل')
            .replace(/May/g, 'مايو')
            .replace(/Jun/g, 'يونيو')
            .replace(/Jul/g, 'يوليو')
            .replace(/Aug/g, 'أغسطس')
            .replace(/Sep/g, 'سبتمبر')
            .replace(/Oct/g, 'أكتوبر')
            .replace(/Nov/g, 'نوفمبر')
            .replace(/Dec/g, 'ديسمبر')
            .replace(new Date(date).getFullYear().toString(), '')
            .replace(' 00:00:00 GMT', '')
    }

}
