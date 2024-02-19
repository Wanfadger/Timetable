import { SidenavComponent } from './sidenav.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgmaterialModule } from 'src/shared/ngmaterial.module';
import { SidenavRoutingModule } from './sidenav-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from './calendar/calendar.module';
import { TimetableModule } from './timetable/timetable.module';
import { NewCalendaComponent } from './new-calenda/new-calenda.component';



@NgModule({
  declarations: [
    SidenavComponent,
    NewCalendaComponent,
  ],
  imports: [
    CommonModule , NgmaterialModule,  ReactiveFormsModule,
    SidenavRoutingModule,
    CalendarModule,
    TimetableModule
  ]
})
export class SidenavModule { }
