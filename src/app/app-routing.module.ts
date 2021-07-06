import { NgModule } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { LikesComponent } from "./likes/likes.component";
import { LoginComponent } from "./login/login.component";
import { MoviesComponent } from "./movies/movies.component";
import { NewUserComponent } from "./new-user/new-user.component";
import { PerfilComponent } from "./perfil/perfil.component";

const routes: Routes = [
  {path: 'login',component: LoginComponent},
  {path: 'create',component: NewUserComponent},
  {path: 'profile',component: PerfilComponent},
  {path: 'search',component: MoviesComponent},
  {path: 'favorites',component: LikesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
