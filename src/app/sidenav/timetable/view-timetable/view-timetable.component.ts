import { HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { DayOfWeek } from '@js-joda/core';
import { chain } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { SchoolFilterService } from 'src/shared/school-filter/school-filter.service';
import { DbTimetable, DbTimetableLesson, DbTimetableStaff, DbTimetableSubject } from '../timetable.dto';
import { FilteredSchoolDetails } from 'src/shared/school-filter/school-filter.component';

@Component({
  selector: 'app-view-timetable',
  templateUrl: './view-timetable.component.html',
  styleUrls: ['./view-timetable.component.scss']
})
export class ViewTimetableComponent implements OnInit {

  isLoading: boolean = false;
  dbTimetable !:DbTimetable
   DayOfWeek = DayOfWeek

   isEdit:boolean = false;
   isUpdating:boolean = false

    filteredSchoolDetails !: FilteredSchoolDetails
    constructor(private router:Router , private toastr:ToastrService , private schoolFilterService:SchoolFilterService) { }

    ngOnInit(): void {
    }



    filterByClassName(dbTimetableLessons:DbTimetableLesson[] , schoolClassName:string):DbTimetableLesson[]{
      return dbTimetableLessons.filter(dbTimetableLesson => dbTimetableLesson.schoolClass.name == schoolClassName);
     }

     filterClassTimes(dbTimetableLessons:DbTimetableLesson[] , schoolClassName:string):{startTime:string,endTime:string}[]{
      return chain(dbTimetableLessons)
      .filter(dbTimetableLesson => dbTimetableLesson.schoolClass.name.toLowerCase() == schoolClassName.toLowerCase())
      .uniqBy(dbTimetableLesson => dbTimetableLesson.startTime)
      .map(dbTimetableLesson => ({startTime:dbTimetableLesson.startTime , endTime:dbTimetableLesson.endTime}))
      .value()
     }




     filterByStarTime(dbTimetableLessons:DbTimetableLesson[] , startTime:string):DbTimetableLesson[]{
      return dbTimetableLessons.filter(dbTimetableLesson => dbTimetableLesson.startTime == startTime);
     }


     findByWeekDay(dbTimetableLessons:DbTimetableLesson[] , dayOfWeek:DayOfWeek):DbTimetableLesson|undefined{
      return dbTimetableLessons.find(dbTimetableLesson => dbTimetableLesson.lessonDay.toLocaleUpperCase() == dayOfWeek.name().toLocaleUpperCase());
     }




     // get day lesson from time list
     getLessonByDayOfWeek(dbTimetableLessons:DbTimetableLesson[] , dayOfWeek:DayOfWeek):DbTimetableLesson|undefined{
      return dbTimetableLessons.find(dbTimetableLesson => dbTimetableLesson.lessonDay.toLocaleUpperCase() === dayOfWeek.name().toLocaleUpperCase());
     }

     onStaffChange(event: MatSelectChange, lesson: DbTimetableLesson) {
      const selectedStaff:DbTimetableStaff = event.value
      lesson.schoolStaff = selectedStaff
    }


    onSubjectChange(event: MatSelectChange, lesson: DbTimetableLesson) {
      const selectedSubject:DbTimetableSubject = event.value
      lesson.subject = selectedSubject
    }





    loadTimetable() {
       let params = new HttpParams().set("school" , this.filteredSchoolDetails?.school?.id as string).set("academicTerm" , this.filteredSchoolDetails?.term?.id as string)
      this.isLoading = true
     const _$:Subscription =  this.schoolFilterService.loadTimetable(params).subscribe({
      next:response => {
        this.isLoading = false
        // console.log("response " , response)
        this.dbTimetable = {... response.data}
      },
      error:(error:HttpErrorResponse) => {
        this.isLoading = false
        console.log(error)
        if(error.error.error.errorCode == 404){
          this.toastr.warning(`Timetable of ${this.filteredSchoolDetails?.school?.name} for ${this.filteredSchoolDetails?.term?.term} Not Found`)
         this.dbTimetable.lessons = []
        }
      },
      complete:() => _$.unsubscribe()
     })
    }


    updateClassTimetable(timetableClass: string) {
     this.isUpdating = true
     this.isEdit = false
     const classLessons:DbTimetableLesson[] =  this.dbTimetable.lessons.filter(tl => tl.schoolClass.name == timetableClass)
     if(classLessons.length == 0) {
       this.toastr.info("class timetable not found")
      return
     }

     const params = new HttpParams().set("timetable" , this.dbTimetable.id).set("schoolClass" , classLessons[0].schoolClass.id)

     const _$:Subscription =  this.schoolFilterService.updateSchoolClassTimetable(params , classLessons).subscribe({
      next:_response => {
        // console.log(response)
        this.isUpdating = false;
        this.toastr.success(`${classLessons[0].schoolClass.name} Timetable updated successfully`)
      },
      error:(error:HttpErrorResponse) => {
        this.isUpdating = false;
        console.log(error);
      },
      complete: () => _$.unsubscribe()
     })

    //  console.log(classLessons)
    }

}
