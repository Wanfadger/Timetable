import { DayOfWeek } from '@js-joda/core';
import { DbTimetableLesson } from './../../school-filter/school-filter.service';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dictionary, chain, groupBy, sortBy, uniq } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { FilteredSchoolDetails } from 'src/app/school-filter/school-filter.component';
import { DbTimetable, SchoolFilterService } from 'src/app/school-filter/school-filter.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-view-timetable',
  templateUrl: './view-timetable.component.html',
  styleUrls: ['./view-timetable.component.scss']
})
export class ViewTimetableComponent implements OnInit {
isLoading: boolean = false;
dbTimetable !:DbTimetable
dbTimetableClasses :string[] = [];
dbTimetableStartTimes :string[] = [];
 DayOfWeek = DayOfWeek

 disabledSaveChanges:boolean = false;

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
  groupByClassName(dbTimetableLessons:DbTimetableLesson[]):Dictionary<DbTimetableLesson[]>|undefined{
   const dictionary:Dictionary<DbTimetableLesson[]> = groupBy(dbTimetableLessons , (dbTimetableLesson:DbTimetableLesson) => dbTimetableLesson.schoolClass.name)

   return dictionary;
  }

  groupByStarTime(dbTimetableLessons:DbTimetableLesson[]):Dictionary<DbTimetableLesson[]>|undefined{
    const dictionary:Dictionary<DbTimetableLesson[]> = groupBy(dbTimetableLessons , (dbTimetableLesson:DbTimetableLesson) => dbTimetableLesson.startTime)
    return dictionary;
   }

   // get day lesson from time list
   getLessonByDayOfWeek(dbTimetableLessons:DbTimetableLesson[] , dayOfWeek:DayOfWeek):DbTimetableLesson|undefined{
    return dbTimetableLessons.find(dbTimetableLesson => dbTimetableLesson.lessonDay.toLocaleUpperCase() === dayOfWeek.name().toLocaleUpperCase());
   }

   onStaffChange(event: MatSelectChange, lesson: DbTimetableLesson, day: DayOfWeek) {
    console.log('onSubjectChange', event.value);
    console.log('SELECTED ROW', lesson);
    console.log('SELECTED ROW', day);

    // const staff: SchoolStaffWithSchool_DistrictDto = event.value

    // switch (day) {
    //   case DayOfWeek.MONDAY:
    //     // update monday staff
    //     const monSub: string = row.MONDAY.split(':')[0] // subject
    //     row.MONDAY = `${monSub}:${staff.firstName} ${staff.lastName}`
    //     break;
    //   case DayOfWeek.TUESDAY:
    //     const tueSub: string = row.TUESDAY.split(':')[0] // subject
    //     row.TUESDAY = `${tueSub}:${staff.firstName} ${staff.lastName}`
    //     break;
    //   case DayOfWeek.WEDNESDAY:
    //     const wedSub: string = row.WEDNESDAY.split(':')[0] // subject
    //     row.WEDNESDAY = `${wedSub}:${staff.firstName} ${staff.lastName}`
    //     break;
    //   case DayOfWeek.THURSDAY:
    //     const thurSub: string = row.THURSDAY.split(':')[0] // subject
    //     row.THURSDAY = `${thurSub}:${staff.firstName} ${staff.lastName}`
    //     break;
    //   case DayOfWeek.FRIDAY:
    //     const friSub: string = row.FRIDAY.split(':')[0] // subject
    //     row.FRIDAY = `${friSub}:${staff.firstName} ${staff.lastName}`
    //     break;
    //   default: console.log("Invalid DAY ", day.name())
    // }

    // // get original row
    // row.MONDAY
    // // update its subject value
  }


  onSubjectChange(event: MatSelectChange, lesson: DbTimetableLesson, day: DayOfWeek) {
    console.log('onSubjectChange', event.value);
    console.log('SELECTED Lesson', lesson);

    // const subject: SchoolSubject = event.value

    // switch (day) {
    //   case DayOfWeek.MONDAY:
    //     // update monday subject
    //     const monStaff: string = row.MONDAY.split(':')[1] // staff
    //     row.MONDAY = `${subject.code}:${monStaff}`
    //     break;
    //   case DayOfWeek.TUESDAY:
    //     const tueStaff: string = row.TUESDAY.split(':')[1] // staff
    //     row.TUESDAY = `${subject.code}:${tueStaff}`
    //     break;
    //   case DayOfWeek.WEDNESDAY:
    //     const wedStaff: string = row.WEDNESDAY.split(':')[1] // staff
    //     row.WEDNESDAY = `${subject.code}:${wedStaff}`
    //     break;
    //   case DayOfWeek.THURSDAY:
    //     const thurStaff: string = row.THURSDAY.split(':')[1] // staff
    //     row.THURSDAY = `${subject.code}:${thurStaff}`
    //     break;
    //   case DayOfWeek.FRIDAY:
    //     const friStaff: string = row.FRIDAY.split(':')[1] // staff
    //     row.FRIDAY = `${subject.code}:${friStaff}`
    //     break;
    //   default: console.log("Invalid DAY ", day.name())
    // }

    // // get original row
    // row.MONDAY
    // // update its subject value
  }




  loadTimetable() {
     let params = new HttpParams().set("school" , this.filteredSchoolDetails?.school?.id as string).set("academicTerm" , this.filteredSchoolDetails?.term?.id as string)
    this.isLoading = true
   const _$:Subscription =  this.schoolFilterService.loadTimetable(params).subscribe({
    next:response => {
      this.isLoading = false
      console.log(response)
      this.dbTimetable = {... response.data}
      const ttls = this.dbTimetable.lessons;
      this.dbTimetableClasses = uniq(ttls.map(tl => tl.schoolClass.name)).sort()
      this.dbTimetableStartTimes = uniq(ttls.map(tl => tl.startTime))
    },
    error:error => {
      this.isLoading = false
      console.log(error)
    },
    complete:() => _$.unsubscribe()
   })
  }


}
