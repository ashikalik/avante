import {Component, OnInit} from '@angular/core';
import {CommonService} from "../../api-services/common.service";
import {City} from "../../models/city";
import {Observable} from "rxjs";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    public city$: Observable<City>;

    constructor(public commonService: CommonService) {
    }

    ngOnInit() {
        this.getCity();
    }

    getCity(): void {
        this.city$ = this.commonService.getCity();
    }

}
