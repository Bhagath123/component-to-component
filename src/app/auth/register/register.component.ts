import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  roles: any = ['student' , 'teacher'] ;
form: NgForm ;
authError: any ;
  constructor(public authService: AuthService) { }

  ngOnInit() {}
  onSubmit(form: NgForm) {
    console.log(form);

    form.resetForm();

  }

}
