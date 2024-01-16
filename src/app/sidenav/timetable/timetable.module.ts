import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConvertHtmlToPdfDirective } from 'src/shared/convert-html-to-pdf.directive';
import { TimetableExcelDirective } from 'src/shared/timetable-uploader.directive';
import { ValueSplitterPipe } from '../../value-splitter.pipe';
import { NewSystemTimetableComponent } from './new-system-timetable/new-system-timetable.component';
import { ViewTimetableComponent } from './view-timetable/view-timetable.component';
import { UploadTimetableComponent } from './upload-timetable/upload-timetable.component';
import { StartEndBreakLunchTimeComponent } from './start-end-break-lunch-time/start-end-break-lunch-time.component';
import { MissingBreakLunchTimeDialogComponent } from './missing-break-lunch-time-dialog/missing-break-lunch-time-dialog.component';
import { NgmaterialModule } from 'src/shared/ngmaterial.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/shared/shared.module';
import { FilterSchoolDetailsComponent } from 'src/app/sidenav/timetable/filter-school-details/filter-school-details.component';

@NgModule({
  declarations: [
    ConvertHtmlToPdfDirective,
    TimetableExcelDirective,
    ValueSplitterPipe,
    ViewTimetableComponent,
    NewSystemTimetableComponent,
    UploadTimetableComponent,
    StartEndBreakLunchTimeComponent,
    MissingBreakLunchTimeDialogComponent,
    FilterSchoolDetailsComponent

  ],
  imports: [
    CommonModule ,
    ReactiveFormsModule,
    NgmaterialModule,
    SharedModule
  ]
})
export class TimetableModule { }
