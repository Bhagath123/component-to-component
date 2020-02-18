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

const routes: Routes = [ {path: '' , redirectTo: '/login', pathMatch: 'full'},
          {path: 'login' , component : LoginComponent , canActivate: [SecureInnerPagesGuard]},
          {path: 'register' , component : RegisterComponent , canActivate: [SecureInnerPagesGuard]},
          {path: 'verify-email-address' , component: VerifyEmailComponent , canActivate: [SecureInnerPagesGuard]},
          {path: 'forget-password' , component: ForgetPasswordComponent, canActivate: [SecureInnerPagesGuard]},
          { path: 'create' , component: postCreateComponent  , canActivate: [AuthGuard]} ,
          {path: 'posts', component: postListComponent , canActivate: [AuthGuard]},
          { path: 'edit/:postId', component: postCreateComponent  , canActivate: [AuthGuard]}];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})

export class AppRoutingModule {

 }
