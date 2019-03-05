import {Component, OnInit} from '@angular/core';
import {UserAuthService} from "../../../core/user-auth.service";
import {SnotifyService} from "ng-snotify";
import {Observable} from "rxjs";
import {Meta, Title} from "@angular/platform-browser";

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


    constructor(public userAuthService: UserAuthService,
                public title: Title,
                public meta: Meta) {
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
        this.title.setTitle('لوحة تحكم الفعالية');
        this.meta.addTag({name: "description", content: 'لوحة تحكم الفعالية'})
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
