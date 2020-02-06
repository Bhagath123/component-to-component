import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { postListComponent } from './posts/post-create/post-list/post-list.component';

import { postCreateComponent } from './posts/post-create/post-create.component';
const routes: Routes = [{path: '', component: postListComponent },
  { path: 'create' , component: postCreateComponent } ,
  { path: 'edit/:postId', component: postCreateComponent }];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})

export class AppRoutingModule {

 }
