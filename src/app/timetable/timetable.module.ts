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
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthenticationModule } from '../authentication/authentication.module';
import { UploadTimetableComponent } from './upload-timetable/upload-timetable.component';



@NgModule({
  declarations: [
    ConvertHtmlToPdfDirective,
    TimetableExcelDirective,
    ValueSplitterPipe,
    SchoolFilterComponent,
    TimetableComponent,
    ViewTimetableComponent,
    NewSystemTimetableComponent,
    UploadTimetableComponent
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
  ]
})
export class TimetableModule { }
