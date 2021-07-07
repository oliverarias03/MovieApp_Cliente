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
import { NavbarComponent } from './navbar/navbar.component';
import { MovieInfoComponent } from './movies/movie-info/movie-info.component';
import { MovieTrailerComponent } from './movies/movie-trailer/movie-trailer.component';
import { SafePipe } from './helpers/SafePipe.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PerfilComponent,
    NewUserComponent,
    MoviesComponent,
    LikesComponent,
    NavbarComponent,
    MovieInfoComponent,
    MovieTrailerComponent,
    SafePipe
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
