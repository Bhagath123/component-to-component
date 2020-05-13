import { Router } from '@angular/router';
import { postService } from 'src/app/posts/post.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-display-student-data',
  templateUrl: './display-student-data.component.html',
  styleUrls: ['./display-student-data.component.css']
})
export class DisplayStudentDataComponent implements OnInit, OnDestroy {
  datas: any = [];
  private postsSub: Subscription;
  editId: any = '';
  router: any;
  constructor(private postservice: postService , private routers: Router) { }

  ngOnInit() {

this.postsSub = this.postservice.updateGetStudentDetailsSectionWise().subscribe(data => {
    this.datas = data;
  });

}
Edit(editId) {
  this.editId = editId;

}
ngOnDestroy() {
  this.postsSub.unsubscribe();
  }
  onUpdate(name, classNo, sectionNo) {
    this.postservice.updateStudentDetails(this.editId, name, classNo, sectionNo);
    this.editId = '';
  }
  onDelete(id: string, classId: string, sectionId: string) {
    this.postservice.deleteStudentPost(id, classId, sectionId);

  }
  onClick() {
 this.routers.navigate(['Get-Section-Wise-Data']);
  }
}
