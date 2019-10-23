import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { Routes, RouterModule } from "@angular/router";
import { ToastrModule } from "ngx-toastr";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";

import { ValidateService } from "./services/validate.service";
import { AuthService } from "./services/auth.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { JwtModule } from "@auth0/angular-jwt";
import { AuthGuard } from "./guards/auth.guard";

import { UserModule } from "./user/user.module";
import { AdminModule } from "./admin/admin.module";
import { routing } from "./app.routing";
import { NavbarComponent } from "./user/components/navbar/navbar.component";
import { LoginComponent } from "./user/components/login/login.component";
import { RegisterComponent } from "./user/components/register/register.component";
import { AdminRegisterComponent } from "./admin/components/admin-register/admin-register.component";
import { AdminLoginComponent } from "./admin/components/admin-login/admin-login.component";
import { HttpAuthInterceptor } from "./guards/http-route.interceptor";

export function tokenGetter() {
  return localStorage.getItem("token");
}

const appRoutes: Routes = [
  { path: "", redirectTo: "/user", pathMatch: "full" },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "adminlogin", component: AdminLoginComponent },
  { path: "adminregister", component: AdminRegisterComponent }
];

@NgModule({
  declarations: [AppComponent],

  imports: [
    UserModule,
    AdminModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    ToastrModule.forRoot({
      positionClass: "toast-top-full-width"
    }),
    CommonModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [
          "localhost:10255",
          "localhost:4200",
        ],
        blacklistedRoutes: ["localhost:3001/auth/"]
      }
    })
  ],
  providers: [ValidateService, AuthService, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpAuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
