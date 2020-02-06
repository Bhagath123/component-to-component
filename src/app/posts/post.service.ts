import { Router } from '@angular/router';
import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({providedIn: 'root'})
// tslint:disable-next-line: class-name
export class postService {
 private  posts: Post[] = [];
 private postUpdate = new Subject<Post[]>();

constructor(private http: HttpClient, private router: Router) {}

 getPosts() {
  // tslint:disable-next-line: ban-types
  this.http.get<{message: String, posts: any}>('http://localhost:3000/api/posts').
  pipe(map((result) => {
   return result.posts.map((post: { title: any; content: any; _id: any; }) => {
     return {
       title: post.title,
       content: post.content,
       id: post._id
    };
   });
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
  return this.http.get<{_id: string , title: string , content: string }>('http://localhost:3000/api/posts/' + id);
}

 updatedPost(id: string , title: string , content: string) {
  const post: Post = { id, title, content };
  this.http.put('http://localhost:3000/api/posts/' + id, post).subscribe(response => {
      const updatedPost = [...this.posts];
      const oldPostIndex = updatedPost.findIndex(p => p.id === post.id) ;
      // tslint:disable-next-line: no-unused-expression
      updatedPost[oldPostIndex] = post;
      this.posts = updatedPost;
      this.postUpdate.next([...this.posts]);
      this.router.navigate(['/']);
  });
 }

 // tslint:disable-next-line: ban-types
 addpost(title: string, content: string, image: File) {
    //  const post: Post = { id: null, title, content };
     // tslint:disable-next-line: ban-types
     const postData = new FormData();
     postData.append('title', title);

     postData.append('content', content);
     postData.append('image', image , title);
     // tslint:disable-next-line: ban-types
     this.http.post<{message: String , prodId: string}>('http://localhost:3000/api/posts', postData )
     .subscribe((responseData) => {
       const post: Post = {
         id: responseData.prodId,
         title,
         content
       } ;
      //  const id = responseData.prodId;
      //  console.log(id);

      //  post.id = id;
      //  console.log(post.id);

       this.posts.push(post);
       this.postUpdate.next([...this.posts]);
       this.router.navigate(['/']);
     });
   }
 deletePost(postId: string) {
   this.http.delete('http://localhost:3000/api/posts/' + postId).subscribe(() => {

    const updatedPosts = this.posts.filter(post => post.id !== postId);
    this.posts = updatedPosts;
    this.postUpdate.next([...this.posts]);
   });
 }



}
