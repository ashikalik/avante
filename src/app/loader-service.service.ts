import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class LoaderService {

    public loaderStatus: boolean;

    constructor() { }

    public show() {
        this.loaderStatus = true;
    }

    public hide() {
        this.loaderStatus = false;
    }


}
