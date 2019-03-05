import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RootComponent} from "./root/root.component";
import {VoluComponent} from "./volu/volu.component";

const routes: Routes = [

    {
        path: '',
        component: RootComponent
    },
    {
        path: 'cv',
        component: VoluComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MyProfileRoutingModule {
}
