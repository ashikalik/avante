import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../api-services/auth.service';
import { Observable } from "rxjs";
import { CommonService } from "../../api-services/common.service";
import { City } from "../../models/city";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  showRegForm: boolean;
  isSignupCompleted: boolean = false;

  showMemberForm: boolean = false;
  showOrganizerForm: boolean = false;
  showCompnayForm: boolean = false;

  organizer: boolean = false;
  member: boolean = false;
  company: boolean = false;

  public cities$: Observable<City>;

  constructor(private authService: AuthService,
    public router: Router,
    public commonService: CommonService) {
  }


  ngOnInit() {
    this.getCity();
    this.onMember();
    this.showRegForm = false;
  }

  getCity(): void {
    this.cities$ = this.commonService.getCity().pipe();
    console.log(this.cities$)

  }

  onNext() {
    this.showRegForm = !this.showRegForm;

    if (this.company) {
      this.showCompnayForm = true
    }
    if (this.organizer) {
      this.showOrganizerForm = true;
    }
    if (this.member) {
      this.showMemberForm = true
    }
  }


  onMember() {
    this.organizer = false;
    this.member = true;
    this.company = false;
  }

  onOrganizer() {
    this.organizer = true;
    this.member = false;
    this.company = false;
  }

  onCompany() {
    this.organizer = false;
    this.member = false;
    this.company = true;
  }

  onCancel() {
    this.organizer = false;
    this.member = true;
    this.company = false;

    this.onNext();
  }



  public onSignup(form: any) {
    this.authService.signup(form).subscribe(
      res => {
          this.isSignupCompleted = true;
        // this.router.navigate(['/home']);
      }, err => {
      });
  }


  toSigin(){
    this.router.navigate(['/auth/login'])
  }

}
