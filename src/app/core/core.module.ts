import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LanguageSettingService} from "./language-setting.service";
import {UserAuthService} from "./user-auth.service";

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [UserAuthService, LanguageSettingService]
})
export class CoreModule {
}
