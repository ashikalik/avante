import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OrganizerService} from "../../../../api-services/organizer.service";
import {CommonService} from "../../../../api-services/common.service";
import {ActivatedRoute} from "@angular/router";
import {Package} from "../../../../models/packages";
import {Audiences} from "../../../../models/audience";

@Component({
  selector: 'app-package-row',
  templateUrl: './package-row.component.html',
  styleUrls: ['./package-row.component.scss']
})
export class PackageRowComponent implements OnInit {
    @Input() package: Package;
    @Output() onUpdate: EventEmitter<any> = new EventEmitter();;
    public showDetails: boolean;
    public showUpdate: boolean;
    public showDelete: boolean;
    public form: FormGroup;
    public event_key: string;
    public audiences: Audiences;





    constructor(public organizerService: OrganizerService,
                public formBuilder: FormBuilder,
                public commonService: CommonService,
                public activatedRoute: ActivatedRoute) {
        this.activatedRoute.parent.params.subscribe(params => {
            this.event_key = params['event-key']
        })

        this.showDetails = false;
        this.showUpdate = false;
    }

    ngOnInit() {
        this.getAudience();
    }


    public getAudience() {
        this.commonService.getAudiance().subscribe(
            res => {
                this.audiences = res;
            }, err => {

            }
        );
    }


    public onShowDetails() {
        this.showDetails = !this.showDetails;
    }

    public onShowDelete() {
        this.showDelete = !this.showDelete;
    }

    public onShowUpdatePackage() {
        if(!this.showUpdate)
            this.initForm();
        this.showUpdate = !this.showUpdate;
    }

    public close() {
        this.showDetails = false;
        this.showUpdate = false;
    }

    public initForm() {
        this.form = this.formBuilder.group(
            {
                'name': [this.package.name, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(40)])],
                'description': [this.package.description, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(200)])],
                'is_free': [this.package.is_free, Validators.compose([Validators.required])],
                'price': [this.package.price, Validators.compose([Validators.required, Validators.min(1)])],
                'specific_tickets': [this.package.specific_tickets, Validators.compose([Validators.required, Validators.min(1)])],
                'max_tickets': [this.package.max_tickets, Validators.compose([Validators.required, Validators.min(1)])],
                'audience_id': [this.package.audience_id, Validators.compose([Validators.required])],
                'status_id': [this.package.status_id, Validators.compose([Validators.required])]
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


    public updatePackage(form: FormGroup) {
        this.organizerService.updateEventPackage(form.value, this.package.package_id, this.event_key).subscribe(
            res => {
                this.onUpdate.emit();
                this.onShowDetails();
            }, err => {

            }
        );

    }

    public deletePackage() {
        this.organizerService.deleteEventPackage(this.package.package_id, this.event_key).subscribe(
            res => {
                this.onUpdate.emit();
                this.onShowDetails();
            }, err => {

            }
        );

    }


}
