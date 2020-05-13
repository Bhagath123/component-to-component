import { NgForm } from '@angular/forms';
import { postService } from 'src/app/posts/post.service';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-display-and-edit',
  templateUrl: './display-and-edit.component.html',
  styleUrls: ['./display-and-edit.component.css']
})
export class DisplayAndEditComponent implements OnInit {

  private itemId: string;
  editName = '';
  editClass = '';
  editSection = '';
  editEmail = '';
  editId = '';
  details;
  constructor(private authService: AuthService, private postservice: postService , public route: ActivatedRoute, private router: Router) { }


  ngOnInit() {


    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      // tslint:disable-next-line: no-unused-expression
      if (paramMap.has('itemId')) {
       this.itemId = paramMap.get('itemId');
       this.postservice.getStudentDetails( this.itemId).subscribe(postData => {
                    console.log(postData);
                    this.editName = postData.name;
                    this.editClass = postData.classNo;
                    this.editSection = postData.sectionNo;
                    this.editId = postData._id;
                  });

                 }
    });

  }
  onUpdate(form: NgForm) {
    this.postservice.updateStudentDetails(this.editId, form.value.name, form.value.classNo, form.value.section);
    this.router.navigate(['Display-Student-Data']);
  }
}
