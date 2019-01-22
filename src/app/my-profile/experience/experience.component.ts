import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CVDetails, Experience} from "../../models/CV";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProfileService} from "../../api-services/profile.service";
import {IMyDpOptions} from 'mydatepicker';
import { MyDatePickerOptions } from '../../models/date-picker-object';
import { DatePickerInputPipe } from '../../shared/date-picker-input.pipe';


@Component({
    selector: 'app-experience',
    templateUrl: './experience.component.html',
    styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

    @Input() CV: CVDetails;
    @Output() onChangeCV: EventEmitter<any> = new EventEmitter();
    public showCreateForm: boolean;
    public showUpdateForm: boolean;
    public areYouSure: boolean;
    public createForm: FormGroup;
    public updateForm: FormGroup;
    public selectedExperience: Experience;

    public myDatePickerOptions = MyDatePickerOptions;
    

    constructor(public profileService: ProfileService,
                public formBuilder: FormBuilder) {
        this.showCreateForm = false;
        this.showUpdateForm = false;
        this.areYouSure = false;

    }

    ngOnInit() {
    }


    public showCreate() {
        if (!this.showCreateForm)
            this.initFormCreate();

        this.showCreateForm = !this.showCreateForm;
    }

    public showSure(selected?: Experience) {
        this.selectedExperience = selected;
        this.areYouSure = !this.areYouSure;
    }


    public showUpdate(selected?: Experience) {
        console.log(selected)
        if (!this.showUpdateForm) {
            this.selectedExperience = selected;
            this.initFormUpdate();
        }
        this.showUpdateForm = !this.showUpdateForm;
    }

    public initFormCreate() {
        this.createForm = this.formBuilder.group(
            {
                'company_name': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(40)])],
                'role': ['', Validators.compose([Validators.required])],
                'from_date': ['', Validators.compose([Validators.required])],
                'end_date': ['', Validators.compose([Validators.required])],
            });
    }

    public initFormUpdate() {
        this.updateForm = this.formBuilder.group(
            {
                'company_name': [this.selectedExperience.company_name, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(40)])],
                'role': [this.selectedExperience.role, Validators.compose([Validators.required])],
                'from_date': [ {date: new DatePickerInputPipe().transform(this.selectedExperience.from_date)} , Validators.compose([Validators.required])],
                'end_date': [{date: new DatePickerInputPipe().transform(this.selectedExperience.end_date)}, Validators.compose([Validators.required])],
            });

            console.log(this.updateForm)
            
    }


    public createExperience(form: FormGroup) {
        let body = form.value;
        body.from_date = form.value.from_date.formatted;
        body.end_date = form.value.end_date.formatted;
        this.profileService.createExperience(body).subscribe(
            res => {
                this.onChangeCV.emit();
                this.showCreate();
            },
            err => {
            }
        );

    }

    public deleteExperience() {
        console.log()
        let body = {
            id: this.selectedExperience.id
        }
        this.profileService.deleteExperience(body).subscribe(
            res => {
                this.onChangeCV.emit();
                this.showSure();
            },
            err => {
            }
        );

    }


}
