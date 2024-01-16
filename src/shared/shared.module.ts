import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgmaterialModule } from './ngmaterial.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SchoolFilterComponent } from './school-filter/school-filter.component';
import { ConfirmComponent } from './confirm/confirm.component';



@NgModule({
  declarations: [SchoolFilterComponent , ConfirmComponent],
  imports: [
    CommonModule,NgmaterialModule, ReactiveFormsModule
  ],
  exports:[ SchoolFilterComponent]
})
export class SharedModule { }
