import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewCalendarComponent } from './new-calendar/new-calendar.component';
import { ViewCalendarComponent } from './view-calendar/view-calendar.component';
import { SharedModule } from 'src/shared/shared.module';
import { NgmaterialModule } from 'src/shared/ngmaterial.module';



@NgModule({
  declarations: [
    NewCalendarComponent,
    ViewCalendarComponent,
  ],
  imports: [
    CommonModule , SharedModule , NgmaterialModule
  ]
})
export class CalendarModule { }
