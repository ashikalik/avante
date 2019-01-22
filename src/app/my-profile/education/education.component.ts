import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CVDetails, EducationQualification} from "../../models/CV";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProfileService} from "../../api-services/profile.service";
import {CommonService} from "../../api-services/common.service";
import {Educations} from "../../models/educations";
import {IMyDpOptions} from 'mydatepicker';

@Component({
    selector: 'app-education',
    templateUrl: './education.component.html',
    styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {
    @Input() CV: CVDetails;
    @Output() onChangeCV: EventEmitter<any> = new EventEmitter();
    public showCreateForm: boolean;
    public showUpdateForm: boolean;
    public areYouSure: boolean;
    public createForm: FormGroup;
    public updateForm: FormGroup;
    public educations: Educations;
    public selectedEducations: EducationQualification;
    public myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'yyyy-mm-dd',
        editableDateField: false,
        firstDayOfWeek: 'su',       //to set the first day of the week
        sunHighlight: false,        //to unhighlight sundays
        alignSelectorRight: true,    //to align the arrow to the right
        openSelectorOnInputClick: true,  //open the datepicker once the input is selected
    };


    constructor(public profileService: ProfileService,
                public formBuilder: FormBuilder,
                public commonService: CommonService) {
        this.showCreateForm = false;
        this.showUpdateForm = false;
        this.areYouSure = false;

    }

    ngOnInit() {
        this.getEducations();
    }


    public getEducations() {
        this.commonService.getEducations().subscribe(res => {
            this.educations = res;
        }, err => {

        })

    }


    public showCreate() {
        if (!this.showCreateForm)
            this.initFormCreate();

        this.showCreateForm = !this.showCreateForm;
    }

    public showSure(selected?: EducationQualification) {
        this.selectedEducations = selected;
        this.areYouSure = !this.areYouSure;
    }


    public showUpdate(selected?: EducationQualification) {
        console.log(selected)
        if (!this.showUpdateForm){
            this.selectedEducations = selected;
            this.initFormUpdate();
        }
        this.showUpdateForm = !this.showUpdateForm;
    }

    public initFormCreate() {
        this.createForm = this.formBuilder.group(
            {
                'name': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(40)])],
                'from_date': ['', Validators.compose([Validators.required])],
                'end_date': ['', Validators.compose([Validators.required])],
                'education_id': ['', Validators.compose([Validators.required])],
            });
    }

    public initFormUpdate() {
        this.updateForm = this.formBuilder.group(
            {
                'name': [this.selectedEducations.qualification_name, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(40)])],
                'from_date': [this.selectedEducations.from_date, Validators.compose([Validators.required])],
                'end_date': [this.selectedEducations.end_date, Validators.compose([Validators.required])],
                'education_id': [this.selectedEducations.education_id, Validators.compose([Validators.required])],
            });
    }


    public createEducation(form: FormGroup) {
        let body = form.value;
        body.from_date = form.value.from_date.formatted;
        body.end_date = form.value.end_date.formatted;
        this.profileService.createEducation(body).subscribe(
            res => {
                this.onChangeCV.emit();
                this.showCreate();
            },
            err => {
            }
        );

    }

    public deleteEducation() {
        console.log()
        let body = {
            eq_id: this.selectedEducations.eq_id
        }
        this.profileService.deleteEducation(body).subscribe(
            res => {
                this.onChangeCV.emit();
                this.showSure();
            },
            err => {
            }
        );

    }


}
