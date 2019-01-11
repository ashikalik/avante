import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactUsService } from '../../services/contact-us.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  public questionForm: FormGroup;
  public sendQuestionSuccess: any;
  

  constructor(public formBuilder: FormBuilder,
    public contactUsService: ContactUsService) {
      this.initForm();
      this.sendQuestionSuccess = null;
      
  }

  ngOnInit() {
    this.initForm();
  }



  public initForm() {
    this.questionForm = this.formBuilder.group(
      {
        'name': [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(20)])],
        'subject': [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(200)])],
        'message': [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(400)])],
        'mobile': [null, Validators.compose([Validators.required, Validators.pattern('^(05)[0-9]{8}$')])],
        'email': [null, Validators.compose([Validators.required, Validators.email])],
        // 'recaptcha': [null, Validators.compose([Validators.required])],
      });

  }

  public sendQuestion(form: any) {

    this.sendQuestionSuccess = null;

    this.contactUsService.contactUs(form.value).subscribe(
      res => {
        this.sendQuestionSuccess = res.meta.message;
        this.questionForm.reset();
      },
      err => {
      }
    );

  }

}
