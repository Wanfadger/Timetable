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
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { AuthenticationModule } from '../authentication/authentication.module';
import { UploadTimetableComponent } from './upload-timetable/upload-timetable.component';
import { StartEndBreakLunchTimeComponent } from './start-end-break-lunch-time/start-end-break-lunch-time.component';
import { MissingBreakLunchTimeDialogComponent } from './missing-break-lunch-time-dialog/missing-break-lunch-time-dialog.component';

import {MatLegacyDialogModule as MatDialogModule} from '@angular/material/legacy-dialog';

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
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    AuthenticationModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatDialogModule
  ]
})
export class TimetableModule { }
