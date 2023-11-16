import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '../authentication/authentication.guard';
import { ViewTimetableComponent } from './view-timetable/view-timetable.component';
import { UploadTimetableComponent } from './upload-timetable/upload-timetable.component';
import { NewSystemTimetableComponent } from './new-system-timetable/new-system-timetable.component';
import { TimetableComponent } from './timetable.component';

const routes: Routes = [
  {path:"" , canActivate:[AuthenticationGuard] ,component:TimetableComponent , children:[
    {path:"" , redirectTo:"Upload" , pathMatch: "full"},
    {path:"Upload" , component:UploadTimetableComponent , canActivate:[AuthenticationGuard]},
    {path:"New" , component:NewSystemTimetableComponent , canActivate:[AuthenticationGuard]},
    {path:"View" , component:ViewTimetableComponent , canActivate:[AuthenticationGuard]}
  ]},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule , RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class TimetableRoutingModule { }
