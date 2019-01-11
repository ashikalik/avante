import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../api-services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  showRegForm: boolean;

  showMemberForm: boolean = false;
  showOrganizerForm: boolean= false;
  showCompnayForm: boolean= false;

  organizer: boolean = false;
  member: boolean = false;
  company: boolean = false;


  constructor(private authService: AuthService) {

  }

  ngOnInit() {
    this.showRegForm = false;
  }


  onNext() {
    this.showRegForm = !this.showRegForm;
    
    if (this.company) {
      this.showCompnayForm = true
    }
    if (this.organizer){
      this.showOrganizerForm = true;
    }
    if(this.member){
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



  public signup(form: any) {

    // const body = {
    //   first_name: form.value.first_name,
    //   last_name: form.value.last_name,
    //   email: form.value.email,
    //   mobile: form.value.mobile,
    //   password: form.value.password,
    //   confirm_password: form.value.confirm_password,
    //   user_type: 5,
    //   gender: form.value.gender,
    //   recaptcha: form.value.recaptcha
    // };


    // this.authService.signup(body).subscribe(
    //   res => {
    //     this.isSignupCompleted = true;
    //     // this.router.navigate(['/home']);
    //   }, err => {
    //   });
  }

}
