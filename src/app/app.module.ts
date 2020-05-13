import { AddToTeacherComponent } from './auth/AddingClass/add-to-teacher/add-to-teacher.component';
import { AuthService } from './auth/auth.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { postService } from './posts/post.service';
import { environment } from '../environments/environment';
import { postListComponent } from './posts/post-create/post-list/post-list.component';
import { HeaderComponent } from './header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule , MatCardModule, MatButtonModule , MatToolbarModule, MatExpansionModule
  , MatProgressSpinnerModule} from '@angular/material';
import { postCreateComponent } from './posts/post-create/post-create.component';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { EditAndDeleteComponent } from './EditAndDeleteData/edit-and-delete/edit-and-delete.component';
import { StudentDataComponent } from './EditAndDeleteData/Data/Teacher-details/Teacher-details.component';
import { DisplayAndEditComponent } from './EditAndDeleteData/display-and-edit/display-and-edit.component';
import { DisplayStudentDataComponent } from './EditAndDeleteData/display-student-data/display-student-data.component';



@NgModule({
  declarations: [
    AppComponent,
    postCreateComponent,
    HeaderComponent,
    postListComponent,
    RegisterComponent,
    LoginComponent,
    ForgetPasswordComponent,
    VerifyEmailComponent,
    // AddToTeacherComponent,
    AddToTeacherComponent,
    EditAndDeleteComponent,
    StudentDataComponent,
    DisplayAndEditComponent,
    DisplayStudentDataComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,

    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule, MatCardModule, MatButtonModule,
    MatProgressSpinnerModule,
     MatToolbarModule, MatExpansionModule, HttpClientModule,
     ReactiveFormsModule, AngularFirestoreModule, AngularFireAuthModule, AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  exports: [AppRoutingModule],
  providers: [AuthService, postService],
  bootstrap: [AppComponent]
})
export class AppModule { }
