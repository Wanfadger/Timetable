import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthenticationGuard } from "./authentication/authentication.guard";


const routes: Routes = [
  {path:"" , loadChildren:() => import("./authentication/authentication.module").then((m) => m.AuthenticationModule)},
 {path:"Management" , loadChildren:() => import("./sidenav/sidenav.module").then((m) => m.SidenavModule) , canActivate:[AuthenticationGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
