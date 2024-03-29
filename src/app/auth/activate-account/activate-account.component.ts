import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthService} from '../../api-services/auth.service';
import {Meta, Title} from "@angular/platform-browser";

@Component({
    selector: 'app-activate-account',
    templateUrl: './activate-account.component.html',
    styleUrls: ['./activate-account.component.sass']
})
export class ActivateAccountComponent implements OnInit {

    public token: any;
    public error: Error;
    public isActivated: boolean;

    constructor(private authService: AuthService,
                private route: ActivatedRoute,
                public title: Title,
                public meta: Meta,
                public router: Router) {

        this.isActivated = false;
    }


    ngOnInit() {
        this.title.setTitle('تنشيط الحساب');
        this.meta.addTag({name: "description", content: 'تفعيل حسابك في ايفينتو'})

        this.route.params.subscribe(params => {
            this.token = params['id'];
            this.activateAccount(this.token);
        });

    }


    toSigin() {
        this.router.navigate(['/auth/login'])
    }


    contactUs() {
        this.router.navigate(['/contact-us'])
    }


    public activateAccount(form: any) {
        this.authService.activateAccount(form).subscribe(
            res => {
                this.isActivated = true;
            }, err => {
                this.isActivated = false;
                this.error = err.value.error;
            });
    }


}
