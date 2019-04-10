import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProfileService } from "../../api-services/profile.service";
import { IMyDpOptions } from 'mydatepicker';
import { CommonService } from "../../api-services/common.service";
import { Nationality } from "../../models/nationality";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserAuthService } from "../../core/user-auth.service";
import { CVDetails } from "../../models/CV";
import { DatePickerInputPipe } from "../../shared/date-picker-input.pipe";
import { MyDatePickerOptions } from '../../models/date-picker-object';
import { EventoError } from '../../models/error';

@Component({
    selector: 'app-bio',
    templateUrl: './bio.component.html',
    styleUrls: ['./bio.component.scss']
})
export class BioComponent implements OnInit {
    @Input() CV: CVDetails;
    @Output() onChangeCV: EventEmitter<any> = new EventEmitter();
    @Output() onUpdates: EventEmitter<any> = new EventEmitter();

    public showCreateForm: boolean;
    public showUpdateForm: boolean;
    public nationality: Nationality;
    public myDatePickerOptions = MyDatePickerOptions;


    public createForm: FormGroup;
    public updateForm: FormGroup;
    public errorInfo: EventoError;

    constructor(public profileService: ProfileService,
        public formBuilder: FormBuilder,
        public userAuthService: UserAuthService,
        public commonService: CommonService) {
        this.showCreateForm = false;
        this.showUpdateForm = false;
    }

    ngOnInit() {
        this.getNationality();
        this.initFormCreate();
    }

    public initFormCreate() {
        this.createForm = this.formBuilder.group(
            {
                'bio': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(1000)])],
                'nationality_id': ['', Validators.compose([Validators.required])],
                'birthday': ['', Validators.compose([Validators.required])]
            });
    }

    public initFormUpdate() {
        this.updateForm = this.formBuilder.group(
            {
                'bio': [this.CV.data.cv.bio, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(1000)])],
                'nationality_id': [this.CV.data.cv.nationality_code, Validators.compose([Validators.required])],
                'birthday': [new DatePickerInputPipe().transform(this.CV.data.cv.birthday), Validators.compose([Validators.required])]
            });
    }

    public getNationality() {
        this.commonService.getNationality().subscribe(res => {
            this.nationality = res;
        }, err => {

        });
    }

    public showCreate() {
        this.showCreateForm = !this.showCreateForm;
        this.checkUpdates();

    }

    public showUpdate() {
        if (!this.showUpdateForm)
            this.initFormUpdate();
        this.showUpdateForm = !this.showUpdateForm;
        this.checkUpdates();
    }

    public checkUpdates() {
        if (this.showCreateForm || this.showUpdateForm) {
            this.onUpdates.emit(true)
        } else {
            this.onUpdates.emit(false);
        }
    }

    createCV(form: FormGroup) {
        this.errorInfo = null;

        let body = form.value;
        body.birthday = form.value.birthday.formatted;
        this.profileService.createCV(body).subscribe(
            res => {
                this.onChangeCV.emit();
                this.showCreate();
            },
            err => {
                this.errorInfo = err.value.error;

            }
        );
    }

    updateCV(form: FormGroup) {
        this.errorInfo = null;

        this.profileService.updateCV(form.value).subscribe(
            res => {
                this.onChangeCV.emit();
                this.showUpdate();
            }, err => {
                this.errorInfo = err.value.error;

            }
        );
    }


}
