import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EventoError} from "../../../models/error";
import {OrganizerService} from "../../../api-services/organizer.service";
import {ActivatedRoute} from "@angular/router";
import {Questions, Question} from "../../../models/queestions";

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
    public event_key: string;

    public showCreateForm: boolean;
    public showUpdateForm: boolean;
    public showDeleteForm: boolean;

    public questions: Questions;
    public selectedQuestion: Question;

    public formCreate: FormGroup;
    public formUpdate: FormGroup;

    public errorCreate: EventoError;
    public errorUpdate: EventoError;
    public errorDelete: EventoError;

    public page: number;
    public limit: number;



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
        this.limit = 10;
        this.getEventQuestions();
    }


    public getEventQuestions() {
        this.organizerService.getEventQuestions(this.page , this.limit, this.event_key).subscribe(
            res=> {
                this.questions = res;

            }, err => {

            }
        );
    }

    public showCreate() {
        this.initCreate();
        this.showCreateForm = !this.showCreateForm;
    }

    public showUpdate(selected?: Question) {
        if(!this.showUpdateForm){
            this.selectedQuestion = selected;
            this.initUpdate();
        }
        this.showUpdateForm = !this.showUpdateForm;
    }

    public showDelete(selected?: Question) {
        if(!this.showDeleteForm){
            this.selectedQuestion = selected;
        }
        this.showDeleteForm = !this.showDeleteForm;
    }

    public initCreate() {
        this.formCreate = this.formBuilder.group(
            {
                'question': ['', Validators.compose([
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(200)])]
            });
    }

    public initUpdate() {
        this.formUpdate = this.formBuilder.group(
            {
                'question': [this.selectedQuestion.question, Validators.compose([
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(200)])]
            });
    }

    public createQuestion(form: FormGroup) {
        this.organizerService.createEventQuestions(form.value , this.event_key).subscribe(
            res => {
                this.showCreate();
                this.getEventQuestions()
            }, err => {
                this.errorCreate = err.value.error;
            }
        )
    }

    public updateQuestion(form: FormGroup) {
        const body = {
            id: this.selectedQuestion.id,
            question: form.value.question
        }

        this.organizerService.updateEventQuestion(body , this.event_key).subscribe(
            res => {
                this.showUpdate();
                this.getEventQuestions();
            }, err => {
                this.errorUpdate = err.value.error;
            }
        )

    }

    public deleteQuestion() {
        const body = {
            'id': this.selectedQuestion.id
        }
        this.organizerService.deleteEventQuestion(body , this.event_key).subscribe(
            res => {
                this.showDelete();
                this.getEventQuestions();
            }, err => {
                this.errorDelete = err.value.error
            }
        )

    }

    goToPage(n: number): void {
        this.page = n;
        this.getEventQuestions();
    }

    onNext(): void {
        this.page++;
        this.getEventQuestions();
    }

    onPrev(): void {
        this.page--;
        this.getEventQuestions();
    }

}
