import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { postService } from 'src/app/posts/post.service';


@Component({
  selector: 'app-add-to-teacher',
  templateUrl: './add-to-teacher.component.html',
  styleUrls: ['./add-to-teacher.component.css']
})
export class AddToTeacherComponent implements OnInit {

  constructor(public postservice: postService) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    if (form.invalid) {
      return ;
    }
    this.postservice.addSectionToTeacher(form.value.email, form.value.class, form.value.section);
    form.resetForm();
    }
}
