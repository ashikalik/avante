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
        $('.show-more').on('click', function () {
            if ($(this).parent().prev().css('display') == 'block') {
                $(this).parent().prev().hide();
                $(this).html('SHOW MORE<br><i class="fas fa-chevron-down"></i>');
            } else {
                $(this).parent().prev().show();
                $(this).html('SHOW LESS<br><i class="fas fa-chevron-up"></i>');
            }
        });
        $('.event-image').on('click', function () {
            $(this).parent().prev().click()
        });
    }

    onEventEdit(event) {
        $('.event-view').hide();
        $('.event-edit').show();
    }

    onEventSave(event) {
        $('.event-edit').hide();
        $('.event-view').show();
    }

    onEventCancel(event) {
        $('.event-edit').hide();
        $('.event-view').show();
    }

    onDashboardToggle() {
        $('.side-menu').toggleClass('show');
        $('.dashboard_toggle').toggleClass('fa-bars').toggleClass('fa-times');
    }

}
