import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication/authentication.guard';

const routes: Routes = [
  {path:"" , loadChildren:() => import("./authentication/authentication.module").then((m) => m.AuthenticationModule)},
  {path:"Timetable" , loadChildren:() => import("./timetable/timetable.module").then((m) => m.TimetableModule) , canActivate:[AuthenticationGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
