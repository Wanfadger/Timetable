import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimetableRoutingModule } from './timetable-routing.module';
import { ConvertHtmlToPdfDirective } from 'src/shared/convert-html-to-pdf.directive';
import { TimetableExcelDirective } from 'src/shared/timetable-uploader.directive';
import { SchoolFilterComponent } from './school-filter/school-filter.component';
import { ValueSplitterPipe } from '../value-splitter.pipe';
import { NewSystemTimetableComponent } from './new-system-timetable/new-system-timetable.component';
import { TimetableComponent } from './timetable.component';
import { ViewTimetableComponent } from './view-timetable/view-timetable.component';
import { UploadTimetableComponent } from './upload-timetable/upload-timetable.component';
import { StartEndBreakLunchTimeComponent } from './start-end-break-lunch-time/start-end-break-lunch-time.component';
import { MissingBreakLunchTimeDialogComponent } from './missing-break-lunch-time-dialog/missing-break-lunch-time-dialog.component';
import { NgmaterialModule } from 'src/shared/ngmaterial.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ConvertHtmlToPdfDirective,
    TimetableExcelDirective,
    ValueSplitterPipe,
    SchoolFilterComponent,
    TimetableComponent,
    ViewTimetableComponent,
    NewSystemTimetableComponent,
    UploadTimetableComponent,
    StartEndBreakLunchTimeComponent,
    MissingBreakLunchTimeDialogComponent
  ],
  imports: [
    CommonModule , TimetableRoutingModule,
    ReactiveFormsModule,
    NgmaterialModule
  ]
})
export class TimetableModule { }
