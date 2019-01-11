import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ViewEventRoutingModule} from './view-event-routing.module';
import {ViewEventComponent} from './view-event/view-event.component';
import {EventService} from "../api-services/event.service";
import {NetworkLayerModule} from "../network-layer/network-layer.module";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [ViewEventComponent],
    imports: [
        CommonModule,
        ViewEventRoutingModule,
        HttpClientModule,
        NetworkLayerModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        EventService
    ]
})
export class ViewEventModule {


}
