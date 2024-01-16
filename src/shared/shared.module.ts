import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgmaterialModule } from './ngmaterial.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SchoolFilterComponent } from './school-filter/school-filter.component';
import { FilterSchoolDetailsComponent } from '../app/sidenav/timetable/filter-school-details/filter-school-details.component';



@NgModule({
  declarations: [SchoolFilterComponent],
  imports: [
    CommonModule,NgmaterialModule, ReactiveFormsModule
  ],
  exports:[ SchoolFilterComponent]
})
export class SharedModule { }
