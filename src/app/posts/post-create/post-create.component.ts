import { postService } from './../post.service';

import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']

})

// tslint:disable-next-line: class-name
export class postCreateComponent {



  editTitle = ' ';
  editContent = '';
  // tslint:disable-next-line: no-shadowed-variable
  constructor(public postService: postService){}

  onAddevent(form: NgForm) {

   this.postService.addpost(form.value.title, form.value.content );
   form.resetForm();

  }
}
