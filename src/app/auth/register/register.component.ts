import { ActivatedRoute, ParamMap } from '@angular/router';
import { postService } from './../../posts/post.service';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  editName: any = '';
  editClass: any = '';
  editSection: any = '';
  editEmail: any = '';
   itemId: string;
// tslint:disable-next-line: ban-types
role: String = 'Student';
// tslint:disable-next-line: ban-types
isStudent: Boolean = true;
// tslint:disable-next-line: ban-types
isTeacher: Boolean = false;
 details: any;
mode = 'Create';
form: NgForm ;
authError: any ;
  constructor(public authService: AuthService , public postservice: postService , public route: ActivatedRoute) { }

  ngOnInit() {


  }
  onSubmit(form: NgForm) {
  //  this.postservice.registerData
  if (form.invalid) {
    return ;
  }
  // this.route.paramMap.subscribe((paramMap: ParamMap) => {
  //   if ( paramMap.has('classNo') && paramMap.has('sectionNo')) {
  //      this.mode = 'edit';
  //   }
  // });


  if (this.isStudent) {
    this.postservice.registerStudentData(form.value.name, form.value.class, form.value.section, form.value.email, this.role) ;
    this.authService.getRole(this.role);
    } else {
      this.postservice.registerTeacherData(form.value.name , form.value.email , this.role) ;
      this.authService.getRole(this.role);
    }

  form.resetForm();

  }
  onStudent() {
 this.role = 'Student';
 this.isStudent = true;
 this.isTeacher = false;


  }
  onTeacher() {
 this.role = 'Teacher';
 this.isTeacher = true;
 this.isStudent = false;
  }



}

