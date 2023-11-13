import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimetableComponent } from './timetable/timetable.component';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { ViewTimetableComponent } from './timetable/view-timetable/view-timetable.component';

const routes: Routes = [
  {path:"" , loadChildren:() => import("./authentication/authentication.module").then((m) => m.AuthenticationModule)},
  {path:"Timetable" , component:TimetableComponent , canActivate:[AuthenticationGuard]},
  {path:"ViewTimetable" , component:ViewTimetableComponent , canActivate:[AuthenticationGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
