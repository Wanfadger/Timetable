import { Component, Input } from '@angular/core';
import { FilteredSchoolDetails } from '../../../../shared/school-filter/school-filter.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-filter-school-details',
  templateUrl: './filter-school-details.component.html',
  styleUrls: ['./filter-school-details.component.scss']
})
export class FilterSchoolDetailsComponent {

  @Input() filteredSchoolDetails !:FilteredSchoolDetails

  constructor( private toastr:ToastrService){

  }

  showStaffList() {
    if (this.filteredSchoolDetails?.staffList) {
      this.toastr.info(`${this.filteredSchoolDetails?.school?.name} staff list
      ${this.filteredSchoolDetails?.staffList.map((staff, index) => `${index + 1} ${staff.firstName} ${staff.lastName}`).join("\n")}`)

      console.log(this.filteredSchoolDetails?.staffList.map((staff, index) => `${index + 1} ${staff.firstName} ${staff.lastName}`))
    }
  }

  showSchoolClasses() {
    if (this.filteredSchoolDetails?.schoolClasses) {
      this.toastr.info(`${this.filteredSchoolDetails?.school?.name} staff list
      ${this.filteredSchoolDetails?.schoolClasses.map((scchoolClass, index) => `${index + 1} ${scchoolClass.name}`).join("\n")}`)
    }
  }
}
