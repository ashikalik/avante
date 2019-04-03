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
    public isOnUpdatesBio: boolean;
    public isOnUpdatesEx: boolean;
    public isOnUpdatesEdu: boolean;
    public isOnUpdatesSkills: boolean;
    

    constructor(public profileService: ProfileService) {
        this.isOnUpdatesBio = false;
        this.isOnUpdatesEdu = false;
        this.isOnUpdatesEx = false;
        this.isOnUpdatesSkills = false;
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


    public onUpdateBio(event){
        console.log(this.isOnUpdatesBio)
        this.isOnUpdatesBio = event;
    }

    public onUpdateEx(event){
        this.isOnUpdatesEx = event;
    }

    public onUpdateSkills(event){
        this.isOnUpdatesSkills = event;
    }

    public onUpdateEdu(event){
        this.isOnUpdatesEdu = event;
    }


}
