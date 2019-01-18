import { Component, OnInit } from '@angular/core';
import {UserAuthService} from "../../core/user-auth.service";
import {UserProfile} from "../../models/user-profile";

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  public userProfile: UserProfile;

  constructor(public userAuthService: UserAuthService) {
      this.userProfile = this.userAuthService.getUserProfile();
  }

  ngOnInit() {
  //   $('.show-more').on('click', function(){
  //     console.log(this);
  //     $(this).closest('.ticket-main-info').addClass('active');
  //     $(this).closest('.ticket-main-info').parent().find('.ticket-more-detail').addClass('active');
  // });
  //     $('.show-less').on('click', function(){
  //         console.log("myone");
  //         $(this).closest('.ticket-more-detail').removeClass('active');
  //         $(this).closest('.ticket-more-detail').parent().find('.ticket-main-info').removeClass('active');
  //     });
  //     $('.show-more-item').on('click', function(){
  //         console.log("myone");
  //         if($(this).parent().parent().find('.ticket-item-detail').hasClass('active'))
  //         {$(this).parent().parent().find('.ticket-item-detail').removeClass('active');
  //             $(this).html('<i class="fas fa-chevron-down"></i>');}
  //         else {$(this).parent().parent().find('.ticket-item-detail').addClass('active');
  //             $(this).html('<i class="fas fa-chevron-up"></i>');}
  //     });
  //
  }

}
