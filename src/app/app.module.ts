import { postService } from './posts/post.service';
import { postListComponent } from './posts/post-create/post-list/post-list.component';
import { HeaderComponent } from './header/header.component';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule , MatCardModule, MatButtonModule , MatToolbarModule,MatExpansionModule} from '@angular/material'
import { postCreateComponent } from './posts/post-create/post-create.component';
import { AppComponent } from './app.component';



@NgModule({
  declarations: [
    AppComponent,
    postCreateComponent,
    HeaderComponent,
    postListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule,MatExpansionModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
