import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { FilteredSchoolDetails } from 'src/app/school-filter/school-filter.component';
import { SchoolFilterService } from 'src/app/school-filter/school-filter.service';

@Component({
  selector: 'app-view-timetable',
  templateUrl: './view-timetable.component.html',
  styleUrls: ['./view-timetable.component.scss']
})
export class ViewTimetableComponent implements OnInit {
isLoading: boolean = false;



  filteredSchoolDetails: FilteredSchoolDetails | null = null
  constructor(private router:Router , private toastr:ToastrService , private schoolFilterService:SchoolFilterService) { }

  ngOnInit(): void {
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

  loadTimetable() {
     let params = new HttpParams().set("school" , this.filteredSchoolDetails?.school?.id as string).set("academicTerm" , this.filteredSchoolDetails?.term?.id as string)
    this.isLoading = true
   const _$:Subscription =  this.schoolFilterService.loadTimetable(params).subscribe({
    next:response => {
      this.isLoading = false
      console.log(response)
    },
    error:error => {
      this.isLoading = false
      console.log(error)
    },
    complete:() => _$.unsubscribe()
   })
  }


}
