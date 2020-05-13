import { StudentData } from '../../studentData.model';
import { postService } from 'src/app/posts/post.service';
import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { Subscription } from 'rxjs/internal/Subscription';


@Component({
  selector: 'app-student-data',
  templateUrl: './Teacher-details.component.html',
  styleUrls: ['./Teacher-details.component.css']
})
export class StudentDataComponent implements OnInit {
  datas: any = [];
  private detailsSub: Subscription;
  constructor(private postservice: postService) { }
  ngOnInit() {
  //  this.detailsSub = this.postservice.getStudentDetailsSection().subscribe(data => {
  //   this.datas = data;
 this.postservice.getTeacherDetails().subscribe(data => {
     // tslint:disable-next-line: semicolon
     this.datas = data

 });

  //  });
    }
    // tslint:disable-next-line: use-lifecycle-interface
    // ngOnDestroy() {
    // this.detailsSub.unsubscribe();
    // }
}
