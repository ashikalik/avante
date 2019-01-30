import {Component, OnInit} from '@angular/core';
import {OrganizerService} from "../../../api-services/organizer.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Terms, Term} from "../../../models/tems";
import {EventoError} from "../../../models/error";
import {query} from "@angular/animations";

@Component({
    selector: 'app-event-terms',
    templateUrl: './event-terms.component.html',
    styleUrls: ['./event-terms.component.scss']
})
export class EventTermsComponent implements OnInit {
    public event_key: string;
    public terms: Terms;

    public showCreateForm: boolean;
    public showUpdateForm: boolean;
    public showDeleteForm: boolean;

    public selectedTerm: Term;

    public formCreate: FormGroup;
    public formUpdate: FormGroup;

    public errorCreate: EventoError;
    public errorUpdate: EventoError;
    public errorDelete: EventoError;

    public page: number;


    constructor(public organizerService: OrganizerService,
                public formBuilder: FormBuilder,
                public activatedRoute: ActivatedRoute) {


        this.activatedRoute.parent.params.subscribe(params => {
            this.event_key = params['event-key']
        });

        this.showCreateForm = false;
        this.showUpdateForm = false;
        this.showDeleteForm = false;


    }

    ngOnInit() {
        this.page = 1;
        this.getEventPolicy();
    }

    public getEventPolicy() {
        this.organizerService.getEventPolicy(this.page , this.event_key).subscribe(
            res => {
                this.terms = res;
            }, err => {

            }
        );
    }

    public showCreate() {
        this.initCreate();
        this.showCreateForm = !this.showCreateForm;
    }

    public showUpdate(selected?: Term) {
        if (!this.showUpdateForm) {
            this.selectedTerm = selected;
            this.initUpdate();
        }
        this.showUpdateForm = !this.showUpdateForm;
    }

    public showDelete(selected?: Term) {
        if (!this.showDeleteForm) {
            this.selectedTerm = selected;
        }
        this.showDeleteForm = !this.showDeleteForm;
    }

    public initCreate() {
        this.formCreate = this.formBuilder.group(
            {
                'policy': ['', Validators.compose([
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(500)])]
            });
    }

    public initUpdate() {
        this.formUpdate = this.formBuilder.group(
            {
                'policy': [this.selectedTerm.policy, Validators.compose([
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(200)])]
            });
    }

    public createTerm(form: FormGroup) {
        this.organizerService.createEventPolicy(form.value, this.event_key).subscribe(
            res => {
                this.showCreate();
                this.getEventPolicy()
            }, err => {
                this.errorCreate = err.value.error;
            }
        )
    }

    public updateTerm(form: FormGroup) {
        const body = {
            'policy_id': this.selectedTerm.policy_id,
            'policy': form.value.policy
        }

        this.organizerService.updateEventPolicy(body, this.event_key).subscribe(
            res => {
                this.showUpdate();
                this.getEventPolicy();
            }, err => {
                this.errorUpdate = err.value.error;
            }
        )

    }

    public deleteTerm() {
        const body = {
            'policy_id': this.selectedTerm.policy_id
        }
        this.organizerService.deleteEventPolicy(body, this.event_key).subscribe(
            res => {
                this.getEventPolicy();
                this.showDelete();
            }, err => {
                this.errorDelete = err.value.error
            }
        )

    }

    goToPage(n: number): void {
        this.page = n;
        this.getEventPolicy();
    }

    onNext(): void {
        this.page++;
        this.getEventPolicy();
    }

    onPrev(): void {
        this.page--;
        this.getEventPolicy();
    }


}
