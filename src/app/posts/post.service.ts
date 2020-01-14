import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'

@Injectable({providedIn:"root"})
export class postService {

 private  posts:Post[]=[];
 private postUpdate = new Subject<Post[]>()
 getPosts(){
   return [...this.posts]
 }
getPostUpdatedListener(){
 return this.postUpdate.asObservable();
}

 addpost(title:string,content:String){
     const post:Post={ title:title,content:content}
     this.posts.push(post);
     this.postUpdate.next([...this.posts]);
 }
}
