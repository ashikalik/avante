import { Component, OnInit } from '@angular/core';
import {UserAuthService} from "../../core/user-auth.service";
import {UserProfile} from "../../models/user-profile";
import {Router} from "@angular/router";
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  public userProfile: UserProfile;

  constructor(public userAuthService: UserAuthService,
              public router: Router,
              public title: Title,
              public meta: Meta
  ) {
      this.userProfile = this.userAuthService.getUserProfile();
      console.log(this.userProfile)
  }

  ngOnInit() {
      this.title.setTitle('الملف الشخصي');
      this.meta.addTag({name: "description", content: 'الملف الشخصي'})
  }

  public onMyCV() {

    this.router.navigate(['/my-profile/cv'])
  }

}
