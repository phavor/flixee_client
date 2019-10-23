import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminComponent } from "./admin.component";
import { AdminRouting } from "./admin.routing";
import { AdminRegisterComponent } from "./components/admin-register/admin-register.component";
import { AdminLoginComponent } from "./components/admin-login/admin-login.component";
import { ValidateService } from "../services/validate.service";
import { AuthService } from "../services/auth.service";
import { AuthGuard } from "../guards/auth.guard";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { HomeComponent } from "./components/home/home.component";
import { ViewMovieComponent } from './components/view-movie/view-movie.component';

@NgModule({
  declarations: [
    AdminComponent,
    NavbarComponent,
    AdminRegisterComponent,
    AdminLoginComponent,
    HomeComponent,
    ViewMovieComponent
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, AdminRouting],
  providers: [ValidateService, AuthService, AuthGuard],
  bootstrap: [AdminComponent]
})
export class AdminModule { }
