import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewCalendarComponent } from './new-calendar/new-calendar.component';
import { ViewCalendarComponent } from './view-calendar/view-calendar.component';
import { SharedModule } from 'src/shared/shared.module';
import { NgmaterialModule } from 'src/shared/ngmaterial.module';
import { PublicHolidaysComponent } from './public-holidays/public-holidays.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewEditPublicHolidayComponent } from './public-holidays/new-edit-public-holiday/new-edit-public-holiday.component';
import { ConfirmComponent } from 'src/shared/confirm/confirm.component';
import { CalendarFilterComponent } from './calendar-filter/calendar-filter.component';



@NgModule({
  declarations: [
    NewCalendarComponent,
    ViewCalendarComponent,
    PublicHolidaysComponent,
    NewEditPublicHolidayComponent,
    CalendarFilterComponent,
    
  ],
  imports: [
    CommonModule , SharedModule , NgmaterialModule ,ReactiveFormsModule
  ]
})
export class CalendarModule { }
