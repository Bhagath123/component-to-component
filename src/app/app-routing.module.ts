import { DisplayStudentDataComponent } from './EditAndDeleteData/display-student-data/display-student-data.component';
import { DisplayAndEditComponent } from './EditAndDeleteData/display-and-edit/display-and-edit.component';
import { StudentDataComponent } from './EditAndDeleteData/Data/Teacher-details/Teacher-details.component';

import { AddToTeacherComponent } from './auth/AddingClass/add-to-teacher/add-to-teacher.component';

import { SecureInnerPagesGuard } from './guard/secure-inner-pages.guard.ts.guard';

import { AuthGuard } from './guard/auth.guard';

import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';

import { RegisterComponent } from './auth/register/register.component';

import { LoginComponent } from './auth/login/login.component';
import { AppComponent } from './app.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { postListComponent } from './posts/post-create/post-list/post-list.component';

import { postCreateComponent } from './posts/post-create/post-create.component';
import { EditAndDeleteComponent } from './EditAndDeleteData/edit-and-delete/edit-and-delete.component';

const routes: Routes = [ {path: '' , redirectTo: '/login', pathMatch: 'full'},
          {path: 'login' , component : LoginComponent , canActivate: [SecureInnerPagesGuard]},
          {path: 'register' , component : RegisterComponent , canActivate: [SecureInnerPagesGuard]},
          {path: 'verify-email-address' , component: VerifyEmailComponent , canActivate: [SecureInnerPagesGuard]},
          {path: 'forget-password' , component: ForgetPasswordComponent, canActivate: [SecureInnerPagesGuard]},
          { path: 'create' , component: postCreateComponent  , canActivate: [AuthGuard]} ,
          {path: 'posts', component: postListComponent , canActivate: [AuthGuard]},
          { path: 'edit/:postId', component: postCreateComponent  , canActivate: [AuthGuard]},
        {path: 'Add-section-to-teacher', component: AddToTeacherComponent , canActivate: [AuthGuard]},
       {path: 'Get-Section-Wise-Data', component: EditAndDeleteComponent},
       {path: 'Get-Student-And-Teacher-Details', component: StudentDataComponent},
       {path: 'Display-Student-Data', component: DisplayStudentDataComponent},
       {path: 'Display-Student-Data/Edit-Student-Details/:itemId', component: DisplayAndEditComponent}
      ];
@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule {
}
