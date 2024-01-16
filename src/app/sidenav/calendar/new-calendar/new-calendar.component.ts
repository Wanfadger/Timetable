import { Component } from '@angular/core';
import { FilteredSchoolDetails } from 'src/shared/school-filter/school-filter.component';


@Component({
  selector: 'app-new-calendar',
  templateUrl: './new-calendar.component.html',
  styleUrls: ['./new-calendar.component.scss']
})
export class NewCalendarComponent {
  filteredSchoolDetails !:FilteredSchoolDetails
}
