import { AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';
import { LanguageSettingService } from "./core/language-setting.service";
import { TranslateService } from "@ngx-translate/core";
import { UserAuthService } from "./core/user-auth.service";
import { NavigationStart, Router, NavigationEnd } from "@angular/router";
import { LoaderService } from "./loader-service.service";
import { Location } from '@angular/common';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewChecked {
    title = 'Evento';

    public direction: string;
    public isAuthenticated: boolean;
    public username: string;
    public userType: number;
    public event_key: string;
    show = false;

    public mobilePayment: boolean;
    public navStartUrl: string;

    deviceInfo = null;
    isMobile = null;
    isTablet = null;
    isDesktopDevice = null;





    constructor(public languageSettingService: LanguageSettingService,
        private translate: TranslateService,
        public userAuthService: UserAuthService,
        public loaderService: LoaderService,
        private cdRef: ChangeDetectorRef,
        public location: Location,
        private deviceService: DeviceDetectorService,
        private router: Router) {
        this.navStartUrl = this.location.path();

        this.epicFunction();

        router.events.forEach((event) => {
            window.scroll(0, 0);
            if (event instanceof NavigationStart) {
                if (this.navStartUrl = event.url) {
                    if (this.navStartUrl && (this.navStartUrl.indexOf('/mobile-payment') > -1) || this.navStartUrl.indexOf('/validate-payment-mobile') > -1) {
                        this.mobilePayment = true;
                    } else {
                        this.mobilePayment = false;
                    }
                }
                if (this.userAuthService.getToken()) {
                    this.isAuthenticated = true;
                    let profile = this.userAuthService.getUserProfile();
                    this.username = profile.data.first_name;
                    this.userType = profile.data.user_type;
                    if (profile.data.event_key) {
                        this.event_key = profile.data.event_key;
                    }
                } else {
                    this.isAuthenticated = false;
                }
            }
        });

        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                (<any>window).ga('set', 'page', event.urlAfterRedirects);
                (<any>window).ga('send', 'pageview');
            }
        });



    }

    public epicFunction() {
        console.log('hello `Home` component');
        this.deviceInfo = this.deviceService.getDeviceInfo();
        this.isMobile = this.deviceService.isMobile();
        this.isTablet = this.deviceService.isTablet();
        this.isDesktopDevice = this.deviceService.isDesktop();
        console.log(this.deviceInfo);
        console.log(this.isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
        console.log(this.isTablet);  // returns if the device us a tablet (iPad etc)
        console.log(this.isDesktopDevice); // returns if the app is running on a Desktop browser.
      }

    ngAfterViewChecked() {
        let show = this.loaderService.loaderStatus;
        if (show != this.show) { // check if it change, tell CD update view
            this.show = show;
            this.cdRef.detectChanges();
        }
    }


    ngOnInit() {
        this.onRtlStyle('');

        if (this.languageSettingService.getLanguage()) {
            if (this.languageSettingService.getLanguage() == 'ar') {
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
        $('.nav_toggle .fas.fa-bars').hide();
        $('.nav_toggle .fas.fa-times').show();
        $('.setting').hide();
        $('.menu_toggle').css('height', 'auto').show();
        $('body').css('overflow-y', 'hidden')
    }
    onMenuHide(event) {
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
        var ltrStyle = '.fas.fa-chevron-down.embed, .embed-text{left:auto !important; right:20px !important;}.border-left-right {border-right:none !important; border-left:1px solid #9e9e9e !important;}.ml_auto{margin-right:unset !important; margin-left: auto !important;}.mr_auto{margin-left:unset !important; margin-right: auto !important;}.notification{left: auto !important; right: -46px !important;}.header .setting{left:auto !important;right:0px !important;border-radius: 8px 0 0 8px !important;}.search-accodian .form-check-input{right:auto !important;left:20px !important;}.text_left{text-align: left !important;}.text-right{text-align: right !important;}.search-accodian ul li i{left: auto !important;right: 0 !important;}.steps-setting.float-not-left div:not(.float-not-left), .eventdetail div{float: left !important;}.steps-setting.float-not-left .float-not-left{float:right !important;}.badge{left:auto !important;right:-60% !important;}.float_left div{float:left !important;}.partner-items{right:auto;left:0px;}.calendar .back{left: 0px !important;  right:auto !important; float:left;}.calendar .back .fa-chevron-right{display: none !important;}.calendar .back .fa-chevron-left{display: inline-block !important;}.span-left{float:left !important;}.span-right{float:right !important;}.custom-text-label{left: auto !important;right: 0.5rem !important;}.border-radius-left{border-radius: 20px 0 0 20px;}.active .border-radius-left{border-radius: 20px 0 0 0;}@keyframes doshboard{0% {margin-left: -100%;}100% {margin-left: 0;}}.left-0{right:auto !important;left:0 !important;}';
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
        var rtlStyle = '.fas.fa-chevron-down.embed, .embed-text{right:auto !important; left:20px !important;}.border-left-right {border-left:none !important;  border-right:1px solid #9e9e9e !important;}.mr_auto{margin-right:unset !important; margin-left: auto !important;}.ml_auto{margin-left:unset !important; margin-right: auto !important;}.notification{right: auto !important; left: -46px !important;}.header .setting{right:auto !important;left:0px !important;border-radius: 0 8px 8px 0 !important;}.search-accodian .form-check-input{left:auto !important;right:0px !important;}.text_left{text-align: right !important;}.text_left label{margin: 0 20px !important;}.text-right{text-align: left !important;}.search-accodian ul li i{right: auto !important;left: 0 !important;}.steps-setting.float-not-left div:not(.float-not-left), .eventdetail div{float: right !important;}.steps-setting.float-not-left .float-not-left{float:left !important;}.signup_content .form-check-label input[type="checkbox"]{left:auto !important; right:-20px !important;}.badge{right:auto !important;left:-60% !important;}.float_left div{float:right !important;}.calendar .back{right: 0px !important;  left:auto !important; float:right;}.calendar .back .fa-chevron-right{display: inline-block !important;}.calendar .back .fa-chevron-left{display: none !important;}.span-left{float:right !important;}.span-right{float:left !important;}.custom-text-label{left: 0.5rem !important;right: auto !important;}.border-radius-left{border-radius: 0 20px 20px 0;}.active .border-radius-left{border-radius: 0 20px 0 0;}@keyframes doshboard{0% {margin-right: -100%;}100% {margin-right: 0;}}.left-0{right:0 !important;left:auto !important;}';
        $('#langStyle').html(rtlStyle);
    }

}
