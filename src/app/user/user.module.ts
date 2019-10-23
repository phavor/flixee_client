import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { HomeComponent } from "./components/home/home.component";
import { UserRouting } from "./user.routing";
import { UserComponent } from "./user.component";
import { AuthGuard } from "../guards/auth.guard";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { AuthService } from "../services/auth.service";
import { ValidateService } from "../services/validate.service";
import { ShowMovieComponent } from "./components/show-movie/show-movie.component";
import { FavoriteMoviesComponent } from "./components/favorite-movies/favorite-movies.component";
import { SearchResultComponent } from "./components/search-result/search-result.component";
import { UserService } from "../services/user.service";
import { LoginGuard } from "../guards/login.guard";


@NgModule({
  declarations: [
    UserComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ShowMovieComponent,
    FavoriteMoviesComponent,
    SearchResultComponent
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, UserRouting],
  providers: [ValidateService, AuthService, UserService, AuthGuard, LoginGuard],
  bootstrap: []
})
export class UserModule { }
