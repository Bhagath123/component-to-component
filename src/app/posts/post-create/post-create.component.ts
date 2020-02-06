import { mimeType } from './mime-type.validator';
import { Post } from './../post.model';
import { postService } from './../post.service';
import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
// tslint:disable-next-line: class-name
export class postCreateComponent implements OnInit {
  editTitle: any = ' ';
  editContent: any = '';
  form: FormGroup;
  post: Post;
   imagePreview = null ;
  private postId: string;
private mode = 'create';
// tslint:disable-next-line: no-shadowed-variable
constructor(public postService: postService, public route: ActivatedRoute, private formBuilder: FormBuilder) {}
ngOnInit() {
  this.form = new FormGroup({
    title: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
    content: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
    image: new FormControl(null, {validators: [Validators.required ], asyncValidators: [mimeType]})
  });
  this.route.paramMap.subscribe((paramMap: ParamMap) => {
  // tslint:disable-next-line: no-unused-expression
             if (paramMap.has('postId')) {
              this.mode = 'edit';
              this.postId = paramMap.get('postId');
              this.postService.getPost(this.postId).subscribe(postData => {
              this.post =  { id: postData._id , title: postData.title , content: postData.content };
              this.editTitle = postData.title;
              this.editContent = postData.content;

              this.form.setValue({title: this.post.title , content: this.post.content});

              });

             } else {
               this.mode = 'create';
               this.postId = null;
             }
});
}
onImagePicked(event: Event) {
  console.log( event ) ;
  const file = (event.target as HTMLInputElement).files[0];
  this.form.patchValue({image: file});
  this.form.get('image').updateValueAndValidity();
  const reader = new FileReader();
  reader.onload = () => {
  this.imagePreview = reader.result;
};
  reader.readAsDataURL(file);
}
onSaveevent() {
    if (this.form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.postService.addpost(this.form.value.title, this.form.value.content , this.form.value.image );
        }
 // tslint:disable-next-line: one-line
 else{
  this.postService.updatedPost(this.postId, this.form.value.title, this.form.value.content );
 }
    this.form.reset();
  }
}
