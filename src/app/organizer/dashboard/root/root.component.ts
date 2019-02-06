import { Component, OnInit } from '@angular/core';
import { UserAuthService } from "../../../core/user-auth.service";
import { SnotifyService } from "ng-snotify";
import { Observable } from "rxjs";

@Component({
    selector: 'app-root',
    templateUrl: './root.component.html',
    styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

    public username: string;
    public isAdmin: boolean;
    public isSellerSupervisor: boolean;
    public isRequestSupervisor: boolean;


    constructor(public userAuthService: UserAuthService) {
        this.isRequestSupervisor = false;
        this.isSellerSupervisor = false;

        if (this.userAuthService.getToken()) {
            let profile = this.userAuthService.getUserProfile();
            this.username = profile.data.first_name;
            if (profile.data.user_type == '2') {
                this.isAdmin = true;
            }

            if (profile.data.permisions && profile.data.permisions.requests == '1') {
                this.isRequestSupervisor = true
            }
            if (profile.data.permisions && profile.data.permisions.sellers == '1') {
                this.isSellerSupervisor = true
            }

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
