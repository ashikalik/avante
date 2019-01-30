import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EventoError} from "../../../models/error";
import {OrganizerService} from "../../../api-services/organizer.service";
import {CommonService} from "../../../api-services/common.service";
import {ActivatedRoute} from "@angular/router";
import {Packages} from "../../../models/packages";
import {Audiences} from "../../../models/audience";

@Component({
    selector: 'app-event-packages',
    templateUrl: './event-packages.component.html',
    styleUrls: ['./event-packages.component.scss']
})
export class EventPackagesComponent implements OnInit {
    public event_key: string;
    public package: Packages;
    public audiences: Audiences;
    public showCreate: boolean;
    public form: FormGroup;
    public errorCreate: EventoError;
    public page: number;


    constructor(public organizerService: OrganizerService,
                public formBuilder: FormBuilder,
                public commonService: CommonService,
                public activatedRoute: ActivatedRoute) {


        this.activatedRoute.parent.params.subscribe(params => {
            this.event_key = params['event-key']
        })

        this.showCreate = false;

    }

    ngOnInit() {
        this.page = 1;
        this.getEventPackages();
        this.getAudience();
    }

    public getEventPackages() {
        this.organizerService.getEventPackages(this.page, this.event_key).subscribe(
            res => {
                this.package = res;
            }, err => {

            }
        );
    }

    public getAudience() {
        this.commonService.getAudiance().subscribe(
            res => {
                this.audiences = res;
            }, err => {

            }
        );
    }

    public onShowCreate() {
        if (!this.showCreate)
            this.initAddForm()
        this.showCreate = !this.showCreate;
    }

    public initAddForm() {
        this.form = this.formBuilder.group(
            {
                'name': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(40)])],
                'description': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(200)])],
                'is_free': ['', Validators.compose([Validators.required])],
                'price': ['', Validators.compose([Validators.required, Validators.min(1)])],
                'specific_tickets': ['', Validators.compose([Validators.required, Validators.min(1)])],
                'max_tickets': ['', Validators.compose([Validators.required, Validators.min(1)])],
                'audience_id': ['', Validators.compose([Validators.required])]
            });

        this.onChangePackageType('');
        this.onChangeSpecificTickets('');


    }

    public onChangePackageType(packageType: any) {
        if (packageType == 1) {
            this.form.get('price').enable();
        } else {
            this.form.get('price').disable();
            this.form.controls['price'].setValue(0);
        }
    }

    public onChangeSpecificTickets(specificTickets: any) {
        if (specificTickets == 1) {
            this.form.get('max_tickets').enable();
        } else {
            this.form.get('max_tickets').disable();
            this.form.controls['max_tickets'].setValue(0);

        }
    }

    public createPackage(form: FormGroup) {
        this.organizerService.createEventPackage(form.value, this.event_key).subscribe(
            res => {
                this.getEventPackages();
                this.onShowCreate();
            }, err => {
                this.errorCreate = err.value.error;
            }
        );
    }

    goToPage(n: number): void {
        this.page = n;
        this.getEventPackages();
    }

    onNext(): void {
        this.page++;
        this.getEventPackages();
    }

    onPrev(): void {
        this.page--;
        this.getEventPackages();
    }
}
