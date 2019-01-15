import {Pipe, PipeTransform} from '@angular/core';
import {LanguageSettingService} from "../core/language-setting.service";

@Pipe({
    name: 'eventoTime'
})
export class EventoTimePipe implements PipeTransform {

    constructor(public languageSettingService: LanguageSettingService) {

    }


    transform(value: any, args?: any): any {
        let hour = (value.split(':'))[0]
        let min = (value.split(':'))[1]
        let part;
        if (this.languageSettingService.getLanguage() == 'ar')
            part = hour > 12 ? 'مساء' : 'صباحا';
        else
            part = hour > 12 ? 'PM' : 'AM';

        min = (min + '').length == 1 ? `0${min}` : min;
        hour = hour > 12 ? hour - 12 : hour;
        hour = (hour + '').length == 1 ? `0${hour}` : hour;
        return `${hour}:${min} ${part}`
    }

}
