import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AdminComponent } from "./admin.component";
import { AdminLoginComponent } from "./components/admin-login/admin-login.component";
import { AdminRegisterComponent } from "./components/admin-register/admin-register.component";
import { AdminAuthGuard } from "../guards/admin-auth.guard.";
import { HomeComponent } from "../admin/components/home/home.component";
import { ViewMovieComponent } from "./components/view-movie/view-movie.component";

const routes: Routes = [
  {
    path: "admin",
    component: AdminComponent,
    children: [
      { path: "", component: HomeComponent, canActivate: [AdminAuthGuard] },
      { path: "login", component: AdminLoginComponent },
      // { path: "register", component: AdminRegisterComponent, canActivate: [AdminAuthGuard] },
      { path: "movie/:id", component: ViewMovieComponent, canActivate: [AdminAuthGuard] }
    ]
  }
];

export const AdminRouting = RouterModule.forRoot(routes);
