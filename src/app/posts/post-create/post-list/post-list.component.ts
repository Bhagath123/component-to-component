import { postService } from './../../post.service';
import { Post } from './../../post.model';
import { Component,  OnInit, OnDestroy } from '@angular/core';
import {Subscription } from 'rxjs';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
})
export class postListComponent  implements OnInit, OnDestroy {

  posts: Post[] = [];
  private postsSub: Subscription;
 constructor(public postService: postService) {}
ngOnInit() {
this.postService.getPosts();
this.postsSub = this.postService.getPostUpdatedListener().subscribe((post: Post[]) => {
  this.posts = post; });
}
ngOnDestroy(){
this.postsSub.unsubscribe();
}
}
