import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../../api-services/profile.service";
import {CVDetails} from "../../models/CV";

@Component({
    selector: 'app-volu',
    templateUrl: './volu.component.html',
    styleUrls: ['./volu.component.scss']
})
export class VoluComponent implements OnInit {

    public CV: CVDetails;


    constructor(public profileService: ProfileService) {
    }

    ngOnInit() {

        this.getCV();

    }


    public getCV() {
        this.profileService.getCV().subscribe(res => {
            this.CV = res;
        }, err => {

        });
    }


}
