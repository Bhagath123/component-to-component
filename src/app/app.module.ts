import { postService } from './posts/post.service';
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
@NgModule({
  declarations: [
    AppComponent,
    postCreateComponent,
    HeaderComponent,
    postListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule, MatCardModule, MatButtonModule,
    MatProgressSpinnerModule,
     MatToolbarModule, MatExpansionModule, HttpClientModule,
     ReactiveFormsModule
  ],
  exports: [AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
