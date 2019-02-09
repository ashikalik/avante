import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  constructor(public router: Router,
              public title: Title,
              public meta: Meta) { }

  ngOnInit() {
    this.title.setTitle('من نحن - ايفينتو');
    this.meta.addTag({name: "description" , content: 'من نحن ، من ايفينتو، مميزات ايفينتو، خدمات ايفينتو'})
  }

  public join() {
    this.router.navigate(['/auth/register'])
  }

  public send() {
    this.router.navigate(['/contact-us'])
  }

}
