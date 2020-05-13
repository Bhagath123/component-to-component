import { StudentData } from './../studentData.model';
import { NgForm } from '@angular/forms';
import { postService } from 'src/app/posts/post.service';
import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

// import { StudentData } from '../studentData.model';



@Component({
  selector: 'app-edit-and-delete',
  templateUrl: './edit-and-delete.component.html',
  styleUrls: ['./edit-and-delete.component.css']
})
export class EditAndDeleteComponent implements OnInit {

   role = 'Teacher';
    //  StudentDetails: any = [];
     // tslint:disable-next-line: ban-types
     clicked: Boolean = false;
  constructor(public postservice: postService ,  private router: Router ) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    if (form.invalid) {
      return ;
    }
    this.postservice.getStudentDetailsSectionWise(form.value.classNo, form.value.section);
    this.router.navigate(['Display-Student-Data']);
    form.reset();

  }
teacherSubmit() {
  this.postservice.getTeacherDetails();
  this.router.navigate(['Get-Student-And-Teacher-Details']) ;
  }
  }
