import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent  implements OnInit {

  constructor(private authService: AuthService , private router: Router) { }
  ngOnInit() {
  }

    LogOut() {
    this.authService.SignOut();
    }
    LogIn() {
      this.router.navigate(['login']) ;
    }
    RegisterIn() {
      this.router.navigate(['register']) ;
    }
}
