import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import { ConvertHtmlToPdfDirective } from 'src/shared/convert-html-to-pdf.directive';
import { TimetableExcelDirective } from 'src/shared/timetable-uploader.directive';
import {MatIconModule} from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { ValueSplitterPipe } from './value-splitter.pipe';
import {MatLegacyTabsModule as MatTabsModule} from '@angular/material/legacy-tabs';
import {MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';
import { SchoolFilterComponent } from './timetable/school-filter/school-filter.component';
import {MatLegacyAutocompleteModule as MatAutocompleteModule} from '@angular/material/legacy-autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatLegacyProgressBarModule as MatProgressBarModule} from '@angular/material/legacy-progress-bar';
import { AuthenticationModule } from './authentication/authentication.module';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import { TimetableComponent } from './timetable/timetable.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthenticationInterceptor } from './authentication/authentication.interceptor';
import { MatNativeDateModule } from '@angular/material/core';
import { ToastrModule } from 'ngx-toastr';
import { ViewTimetableComponent } from './timetable/view-timetable/view-timetable.component';
import {MatLegacyTooltipModule as MatTooltipModule} from '@angular/material/legacy-tooltip';
import { NewSystemTimetableComponent } from './timetable/new-system-timetable/new-system-timetable.component';
import { TimetableModule } from './timetable/timetable.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },],
  bootstrap: [AppComponent],
})
export class AppModule { }
