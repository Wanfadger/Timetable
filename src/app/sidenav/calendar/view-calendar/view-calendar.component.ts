import { Component } from '@angular/core';
import { FilteredSchoolDetails } from 'src/shared/school-filter/school-filter.component';

@Component({
  selector: 'app-view-calendar',
  templateUrl: './view-calendar.component.html',
  styleUrls: ['./view-calendar.component.scss']
})
export class ViewCalendarComponent {
  filteredSchoolDetails !:FilteredSchoolDetails
}
