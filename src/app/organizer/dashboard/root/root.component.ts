import {Component, OnInit} from '@angular/core';
import {UserAuthService} from "../../../core/user-auth.service";
import {SnotifyService} from "ng-snotify";
import {Observable} from "rxjs";

@Component({
    selector: 'app-root',
    templateUrl: './root.component.html',
    styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {
    public username: string;


    constructor(public userAuthService: UserAuthService) {

        if (this.userAuthService.getToken()) {
            let profile = this.userAuthService.getUserProfile();
            this.username = profile.data.first_name;
        }

    }

    ngOnInit() {
    }


    onDashboardToggle() {
        $('.side-menu').toggleClass('show');
        $('.dashboard_toggle').toggleClass('fa-bars').toggleClass('fa-times');
    }

    onMenuHide() {
        $('.side-menu').removeClass('show');
        $('.dashboard_toggle').toggleClass('fa-bars').toggleClass('fa-times');

    }

}
