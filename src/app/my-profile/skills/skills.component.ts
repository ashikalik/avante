import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CVDetails, EducationQualification, Skill} from "../../models/CV";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Educations} from "../../models/educations";
import {ProfileService} from "../../api-services/profile.service";
import {CommonService} from "../../api-services/common.service";
import { EventoError } from '../../models/error';

@Component({
    selector: 'app-skills',
    templateUrl: './skills.component.html',
    styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

    @Input() CV: CVDetails;
    @Output() onChangeCV: EventEmitter<any> = new EventEmitter();
    @Output() onUpdates: EventEmitter<any> = new EventEmitter();
    
    public showCreateForm: boolean;
    public showUpdateForm: boolean;
    public areYouSure: boolean;
    public createForm: FormGroup;
    public updateForm: FormGroup;
    public selectedSkill: Skill;
    public errorInfo: EventoError;
    

    constructor(public profileService: ProfileService,
                public formBuilder: FormBuilder,
                public commonService: CommonService) {
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
        this.checkUpdates();
        
    }

    public showSure(selected?: Skill) {
        this.selectedSkill = selected;
        this.areYouSure = !this.areYouSure;
        this.checkUpdates();
        
    }


    public showUpdate(selected?: Skill) {
        if (!this.showUpdateForm){
            this.selectedSkill = selected;
            this.initFormUpdate();
        }
        this.showUpdateForm = !this.showUpdateForm;
        this.checkUpdates();
        
    }

    public checkUpdates(){
        if(this.showCreateForm || this.showUpdateForm || this.areYouSure){
            this.onUpdates.emit(true)
        } else{
            this.onUpdates.emit(false);
        }
     }

    public initFormCreate() {
        this.createForm = this.formBuilder.group(
            {
                'name': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(40)])]
            });
    }

    public initFormUpdate() {
        this.updateForm = this.formBuilder.group(
            {
                'name': [this.selectedSkill.name, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(40)])],
            });
    }


    public createSkill(form: FormGroup) {
        let body = form.value;
        this.errorInfo = null;
        this.profileService.createSkill(body).subscribe(
            res => {
                this.onChangeCV.emit();
                this.showCreate();
            },
            err => {
                this.errorInfo = err.value.error;
                
            }
        );

    }

    public updateSkill(form: FormGroup) {
        let body = form.value;
        this.errorInfo = null;        
        body['skill_id'] = this.selectedSkill.skill_id;
        this.profileService.updateSkill(body).subscribe(
            res => {
                this.onChangeCV.emit();
                this.showUpdate();
            },
            err => {
                this.errorInfo = err.value.error;
                
            }
        );

    }

    public deleteSkill() {
        this.errorInfo = null;
        
        let body = {
            skill_id: this.selectedSkill.skill_id
        }
        this.profileService.deleteSkill(body).subscribe(
            res => {
                this.onChangeCV.emit();
                this.showSure();
            },
            err => {
                this.errorInfo = err.value.error;
                
            }
        );

    }


}
