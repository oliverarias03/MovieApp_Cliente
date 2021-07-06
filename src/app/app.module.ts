import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SharedService } from './shared.service';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from "@angular/forms";
import { PerfilComponent } from './perfil/perfil.component';
import { NewUserComponent } from './new-user/new-user.component';
import { MoviesComponent } from './movies/movies.component';
import { LikesComponent } from './likes/likes.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PerfilComponent,
    NewUserComponent,
    MoviesComponent,
    LikesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
