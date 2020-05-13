import { StudentData } from './../EditAndDeleteData/studentData.model';
// tslint:disable-next-line: import-blacklist
// import * as Rx from 'rxjs/Rx';
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Router } from '@angular/router';
import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// import { map } from 'rxjs/operators';

import { EmailValidator } from '@angular/forms';
@Injectable({providedIn: 'root'})
// tslint:disable-next-line: class-name
export class postService {
 private  posts: Post[] = [];
 private Details = [];
 private DetailsUpdate = new Subject();
//  asyncEvents$: Observable<StudentData[]>;
 private postUpdate = new Subject<Post[]>();

//  role = 'Teacher';
constructor(private http: HttpClient, private router: Router) {}

 getPosts() {
  // tslint:disable-next-line: ban-types
  this.http.get<{message: String, posts: any}>('http://localhost:3000/api/posts').
  pipe(map((result) => {
   return result.posts.map((post => {
     return {
       title: post.title,
       content: post.content,
       id: post._id,
       imageUrl: post.imageUrl
    };
   }));
  })).subscribe((postData) => {
    this.posts = postData;
    this.postUpdate.next([...this.posts]);
  });
 }
getPostUpdatedListener() {
 return this.postUpdate.asObservable();
}
getPost(id: string) {
  // tslint:disable-next-line: no-unused-expression
  return this.http.get<{_id: string , title: string , content: string , imageUrl: string }>
  ('http://localhost:3000/api/posts/' + id);
}


addpost(title: string, content: string, image: File) {
  //  const post: Post = { id: null, title, content };
   // tslint:disable-next-line: ban-types
   const postData = new FormData();
   postData.append('title', title);

   postData.append('content', content);
   postData.append('image', image , title);
   // tslint:disable-next-line: ban-types
   this.http.post<{message: String , post: Post}>('http://localhost:3000/api/posts', postData )
   .subscribe((responseData) => {
     const post: Post = {
       id: responseData.post.id,
       title,
       content,
       imageUrl: responseData.post.imageUrl
     } ;

     this.posts.push(post);
     this.postUpdate.next([...this.posts]);
     this.router.navigate(['/']);
   });
 }


 updatedPost(id: string , title: string , content: string , image: any) {
  // const post: Post = { id, title, content, imageUrl: null };
  let postData: Post | FormData;

  if (typeof(image === 'object')) {
     postData = new FormData();
     postData.append('id', id);
     postData.append('title', title);

     postData.append('content', content);
     postData.append('image', image , title);
  } else {
     // tslint:disable-next-line: label-position
     postData = {
      id,
      title,
      content,
      imageUrl: image
    };
  }
  this.http.put('http://localhost:3000/api/posts/' + id, postData).subscribe(response => {
      const updatedPost = [...this.posts];
      const oldPostIndex = updatedPost.findIndex(p => p.id === id) ;
      const post: Post = {
        id,
        title,
        content,
        imageUrl: image
      };
      // tslint:disable-next-line: no-unused-expression
      updatedPost[oldPostIndex] = post;
      this.posts = updatedPost;
      this.postUpdate.next([...this.posts]);
      this.router.navigate(['/']);
  });

 }

 // tslint:disable-next-line: ban-types

 deletePost(postId: string) {
   this.http.delete('http://localhost:3000/api/posts/' + postId).subscribe(() => {

    const updatedPosts = this.posts.filter(post => post.id !== postId);
    this.posts = updatedPosts;
    this.postUpdate.next([...this.posts]);
   });
 }


 registerStudentData(name, classNo, sectionNo, email, role) {
   const studentRegister = {name, classNo, sectionNo, email, role };
   this.http.post('http://localhost:3000/api/posts/studentDetails', studentRegister).subscribe(data => {
   console.log(data);

 }) ;
 }
 registerTeacherData(name, email, role) {

const teacherRegister = { name, email, role} ;
this.http.post('http://localhost:3000/api/posts/teacherDetails', teacherRegister).subscribe(data => {
  console.log(data);
})  ;
 }

updateRegisterStudentData(classId, sectionId, name, classNo, sectionNo, email, role) {
const updatedresult = {classId, sectionId, name, classNo, sectionNo, email, role } ;
this.http.put('http://localhost:3000/api/posts/' + classId + '/' + sectionId, updatedresult ).subscribe(data => {
  console.log(data);

});

}

addSectionToTeacher(email, classId, sectionId) {
  const details = {email , classId , sectionId } ;
  this.http.post(`http://localhost:3000/api/posts/Add-section-to-teacher/${email}/${classId}/${sectionId}`, details).subscribe(data => {
 console.log(data);


  });
}
getStudentDetailsSectionWise(classNo, section) {
  // tslint:disable-next-line: deprecation
  return this.http.get<any[]>(`http://localhost:3000/api/posts/GetStudentData/${classNo}/${section}`).subscribe(data => {
    this.Details = data;
    this.DetailsUpdate.next([...data]);
  });
 }
 updateGetStudentDetailsSectionWise() {
 return this.DetailsUpdate.asObservable();
 }
getStudentDetails(id: string) {
  return this.http.get<{_id: string , name: string , classNo: string , email: string , sectionNo: string}>
  (`http://localhost:3000/api/posts/StuentDetails/${id}`);
}
updateStudentDetails(id: string, name: string, classNo: string, sectionNo: string) {
  const  postData = {name, classNo, sectionNo};
  return this.http.put(`http://localhost:3000/api/posts/UpdateStuentDetails/${id}`, postData).subscribe(response => {
    // this.DetailsUpdate =
  });

}
deleteStudentPost(studentId: string, classId: string, sectionId: string) {
  this.http.delete('http://localhost:3000/api/posts/DeleteStuentDetails/'  + studentId).subscribe(() => {
   const DetailsUpdate = this.Details.filter(Details =>  Details.id !== studentId);
   this.Details = DetailsUpdate;
   this.DetailsUpdate.next([...this.Details]);
   this.http.put('http://localhost:3000/api/posts/DeleteStuentDetails/' + classId + '/' + sectionId + '/' + studentId, this.DetailsUpdate)
  });
}
getTeacherDetails() {
return this.http.get(`http://localhost:3000/api/posts/GetTeacherData/Teacher`);
}

}
