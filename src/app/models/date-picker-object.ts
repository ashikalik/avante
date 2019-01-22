
import {IMyDpOptions} from 'mydatepicker';

export let  MyDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    editableDateField: false,
    firstDayOfWeek: 'su',       //to set the first day of the week
    sunHighlight: false,        //to unhighlight sundays
    alignSelectorRight: true,    //to align the arrow to the right
    openSelectorOnInputClick: true,  //open the datepicker once the input is selected

};
