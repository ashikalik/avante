import {AfterViewChecked, ChangeDetectorRef, Component} from '@angular/core';
import {LanguageSettingService} from "./core/language-setting.service";
import {TranslateService} from "@ngx-translate/core";
import {UserAuthService} from "./core/user-auth.service";
import {NavigationStart, Router} from "@angular/router";
import {LoaderService} from "./loader-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewChecked{
    title = 'Evento';

    public direction: string;
    public isAuthenticated: boolean;
    public username: string;
    public userType: number;
    show = false;


    constructor(public languageSettingService: LanguageSettingService,
                private translate: TranslateService,
                public userAuthService: UserAuthService,
                public loaderService: LoaderService,
                private cdRef : ChangeDetectorRef,
                private router: Router) {


        router.events.forEach((event) => {
            if (event instanceof NavigationStart) {
                if(this.userAuthService.getToken()) {
                    this.isAuthenticated = true;
                    let profile = this.userAuthService.getUserProfile();
                    this.username = profile.data.first_name;
                    this.userType = profile.data.user_type;
                } else {
                    this.isAuthenticated = false;
                }
            }
        });



    }

    ngAfterViewChecked() {
        let show = this.loaderService.loaderStatus;
        if (show != this.show) { // check if it change, tell CD update view
            this.show = show;
            this.cdRef.detectChanges();
        }
    }


    ngOnInit() {
        console.log(this.languageSettingService.getLanguage())
        if(this.languageSettingService.getLanguage()) {
            if(this.languageSettingService.getLanguage() == 'ar') {
                this.onRtlStyle(0);
            } else {
                this.onLtrStyle(0);
            }
        } else {
            this.languageSettingService.setDirection('rtl');
            this.languageSettingService.setStartDirection('right');
            this.languageSettingService.setLanguage('ar')
            this.direction = 'rtl'

        }
    }

    public logout() {
        this.userAuthService.clearSession();
        this.router.navigate(['/home']);
    }


    public goHome() {
        this.router.navigate(['/home']);
    }


    onMenuView(event) {
        console.log('menu view');
        $('.nav_toggle .fas.fa-bars').hide();
        $('.nav_toggle .fas.fa-times').show();
        $('.setting').hide();
        $('.menu_toggle').css('height', 'auto').show();
        $('body').css('overflow-y', 'hidden')
    }
    onMenuHide(event) {
        console.log('menu hide');
        $('.nav_toggle .fas.fa-times').hide();
        $('.nav_toggle .fas.fa-bars').show();
        $('.setting').show();
        $('.menu_toggle').css('height', 'auto').hide();
        $('body').css('overflow-y', 'auto')
    }
    onLtrStyle(event) {
        this.languageSettingService.setDirection('ltr');
        this.direction = 'ltr';
        this.languageSettingService.setLanguage('en')
        this.translate.setDefaultLang('en');
        $('body').css('direction', 'ltr').css('text-align', 'left');
        var ltrStyle = '.fas.fa-chevron-down.embed{left:auto !important; right:20px !important;}.border-left-right {border-right:none !important; border-left:1px solid #9e9e9e !important;}.slider-accordion-title span{transform:rotate(-90deg) !important;}.ml-auto{margin-right:unset;}.mr-auto{margin-left:unset;}.notification{left: auto !important; right: -46px !important;}.header .setting{left:auto !important;right:0px !important;border-radius: 8px 0 0 8px !important;}.search-accodian .form-check-input{right:auto !important;left:20px !important;}.text_left{text-align: left !important;}.text-right{text-align: right !important;}.search-accodian ul li i{left: auto !important;right: 0 !important;}.steps-setting.float-not-left div:not(.float-not-left), .eventdetail div{float: left !important;}.steps-setting.float-not-left .float-not-left{float:right !important;}.badge{left:auto !important;right:-60% !important;}.float_left div{float:left !important;}.partner-items{right:auto;left:0px;}.calendar .back{left: 0px !important;  right:auto !important; float:left;}.calendar .back .fa-chevron-right{display: none !important;}.calendar .back .fa-chevron-left{display: inline-block !important;}.span-left{float:left !important;}@media (max-width: 768px) {.partner-items {animation: slider-mobile 15s 2s infinite normal backwards !important;}}';
        $('#langStyle').html(ltrStyle);
        // $('.fas.fa-chevron-left').removeClass('fa-chevron-left').addClass('changed');
        // $('.fas.fa-chevron-right').removeClass('fa-chevron-right').addClass('fa-chevron-left');
        // $('.fas.changed').removeClass('changed').addClass('fa-chevron-right');
    }
    onRtlStyle(event) {
        this.languageSettingService.setDirection('rtl');
        this.languageSettingService.setLanguage('ar');
        this.direction = 'rtl';
        this.translate.setDefaultLang('ar');
        $('body').css('direction', 'rtl').css('text-align', 'right');
        var rtlStyle = '.fas.fa-chevron-down.embed{right:auto !important; left:20px !important;}.border-left-right {border-left:none !important;  border-right:1px solid #9e9e9e !important;}.slider-accordion-title span{transform:rotate(90deg) !important;}.mr-auto{margin-right:unset !important; margin-left: auto !important;}.ml-auto{margin-left:unset !important; margin-right: auto !important;}.notification{right: auto !important; left: -46px !important;}.header .setting{right:auto !important;left:0px !important;border-radius: 0 8px 8px 0 !important;}.search-accodian .form-check-input{left:auto !important;right:0px !important;}.text_left{text-align: right !important;}.text_left label{margin: 0 20px !important;}.text-right{text-align: left !important;}.search-accodian ul li i{right: auto !important;left: 0 !important;}.steps-setting.float-not-left div:not(.float-not-left), .eventdetail div{float: right !important;}.steps-setting.float-not-left .float-not-left{float:left !important;}.signup_content .form-check-label input[type="checkbox"]{left:auto !important; right:-20px !important;}.badge{right:auto !important;left:-60% !important;}.float_left div{float:right !important;}.partner-items{left:auto;right:0px;}.calendar .back{right: 0px !important;  left:auto !important; float:right;}.calendar .back .fa-chevron-right{display: inline-block !important;}.calendar .back .fa-chevron-left{display: none !important;}.span-left{float:right !important;}@media (max-width: 768px) {.partner-items {animation: slider-mobile-right 15s 2s infinite normal backwards !important;}}';
        $('#langStyle').html(rtlStyle);
    }


}
