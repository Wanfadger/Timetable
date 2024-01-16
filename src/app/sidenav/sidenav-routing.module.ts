import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { AuthenticationGuard } from '../authentication/authentication.guard';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"" , canActivateChild:[AuthenticationGuard] ,component:SidenavComponent , children:[
    {path:"" , redirectTo:"Timetable" , pathMatch: "full"},
    {path:"Timetable" , loadChildren:() => import("../timetable/timetable.module").then((m) => m.TimetableModule) , canActivate:[AuthenticationGuard]},
  ]},
];

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SidenavRoutingModule { }
