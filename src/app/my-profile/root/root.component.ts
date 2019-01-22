import { Component, OnInit } from '@angular/core';
import {UserAuthService} from "../../core/user-auth.service";
import {UserProfile} from "../../models/user-profile";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  public userProfile: UserProfile;

  constructor(public userAuthService: UserAuthService, public router: Router) {
      this.userProfile = this.userAuthService.getUserProfile();
      console.log(this.userProfile)
  }

  ngOnInit() {

  }

  public onMyCV() {
      console.log('to CV')
      this.router.navigate(['/my-profile/cv'])
  }

}
