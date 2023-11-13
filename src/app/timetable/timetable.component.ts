import { SchoolFilterService } from './../school-filter/school-filter.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DayOfWeek } from '@js-joda/core';
import { TimeTableExcel, TimeTableRowExcel } from 'src/shared/timetable-uploader.directive';
import {
  School, SampleSchool, AcademicTerm, SchoolClass,
  DbSchoolClass, SchoolTimeTable, SchoolTimeTableLesson, SchoolSubject
} from '../dto/dto';
import { FilteredSchoolDetails } from '../school-filter/school-filter.component';
import { Dictionary, groupBy } from 'lodash';
import { SchoolStaffWithSchool_DistrictDto } from '../school-filter/school-filter.service';
import { MatSelectChange } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent implements OnInit {

  school: School = SampleSchool
  academicTerm: AcademicTerm = AcademicTerm
  DayOfWeek = DayOfWeek
  isUploading: boolean = false

  uploadControl: FormControl = new FormControl()

  timeTableExcels: TimeTableExcel[] = []
  dbSchoolClass: SchoolClass[] = DbSchoolClass


  filteredSchoolDetails: FilteredSchoolDetails | null = null
  invalidLessonCounts: { name: string, count: number }[] = []



  constructor(private schoolFilterService: SchoolFilterService , private toastr: ToastrService) { }

  ngOnInit(): void {
  }



  excelData(timeTableExcels: TimeTableExcel[]) {
    this.timeTableExcels = timeTableExcels
    // console.log('timeTableExcels ', timeTableExcels)
  }



  isUploadingEvent(status: boolean) {
    // console.log('isUploadingEvent', status)
    this.isUploading = status;
    if (!status) {
      this.uploadControl.reset()
    }
  }



  getStaffByFullName(schoolStaffs: SchoolStaffWithSchool_DistrictDto[], fullName: string): SchoolStaffWithSchool_DistrictDto | undefined {
    const names: string[] = fullName.split(" ")
    let firstName: string = ''
    let lastName: string = '' // incase name is more than 2
    if (names.length > 0) {
      firstName = names.length > 0 ? names[0] : ''
      const names2 = [...names]
      names2.splice(0, 1) // removes firstname
      lastName = names2.join(" ")  // incase name is more than 2
    }
    const selectedStaff: SchoolStaffWithSchool_DistrictDto | undefined = schoolStaffs
      .find(staff => (staff.firstName.toLocaleLowerCase() === firstName.toLocaleLowerCase()) && (staff.lastName.toLocaleLowerCase() === lastName.toLocaleLowerCase()))
    return selectedStaff
  }


  getSubjectByCode(subjects: SchoolSubject[], code: string): SchoolSubject | undefined {
    return subjects
      .find(sub => (sub.code.toLocaleLowerCase() == code.toLocaleLowerCase()))
  }

  getSchoolClassByName(schoolClasses: SchoolClass[], name: string): SchoolClass | undefined {
    return schoolClasses
      .find(schoolClasse => (schoolClasse.name.toLocaleLowerCase() === name.toLocaleLowerCase()))
  }


  convertExcelTimetableToTimetable(timeTableExcels: TimeTableExcel[]): SchoolTimeTable | null {
    const lessons: SchoolTimeTableLesson[] = timeTableExcels.flatMap(timeTableExcel => {

      const schoolClass = this.getSchoolClassByName(this.dbSchoolClass, timeTableExcel.schoolClass.name) as SchoolClass

      return timeTableExcel.rows.flatMap(row => {
        const ttLessons: SchoolTimeTableLesson[] = []

        const times: string[] = row.TIME.split("-")
        const startTime = times[0].includes("am") ? times[0].replace("am", "").trim() : times[0].replace("pm", "").trim()
        const endTime = times[1].includes("am") ? times[1].replace("am", "").trim() : times[1].replace("pm", "").trim()


        const mon: string[] = row.MONDAY.split(":")
        const monSubject: SchoolSubject = this.getSubjectByCode(this.filteredSchoolDetails?.subjects || [], mon[0]) as SchoolSubject
        const monStaff: SchoolStaffWithSchool_DistrictDto = this.getStaffByFullName(this.filteredSchoolDetails?.staffList || [], mon[1]) as SchoolStaffWithSchool_DistrictDto
        ttLessons.push({ id: "", lessonDay: "monday", schoolClass, subject: monSubject, startTime, endTime, schoolStaff: monStaff })


        const tue: string[] = row.TUESDAY.split(":")
        const tueSubject: SchoolSubject = this.getSubjectByCode(this.filteredSchoolDetails?.subjects || [], tue[0]) as SchoolSubject
        const tueStaff: SchoolStaffWithSchool_DistrictDto = this.getStaffByFullName(this.filteredSchoolDetails?.staffList || [], tue[1]) as SchoolStaffWithSchool_DistrictDto
        ttLessons.push({ id: "", lessonDay: "tuesday", schoolClass, subject: tueSubject, startTime, endTime, schoolStaff: tueStaff })

        const wed: string[] = row.WEDNESDAY.split(":")
        const wedSubject: SchoolSubject = this.getSubjectByCode(this.filteredSchoolDetails?.subjects || [], wed[0]) as SchoolSubject
        const wedStaff: SchoolStaffWithSchool_DistrictDto = this.getStaffByFullName(this.filteredSchoolDetails?.staffList || [], wed[1]) as SchoolStaffWithSchool_DistrictDto
        ttLessons.push({ id: "", lessonDay: "wednesday", schoolClass, subject: wedSubject, startTime, endTime, schoolStaff: wedStaff })


        const thurs: string[] = row.THURSDAY.split(":")
        const thursSubject: SchoolSubject = this.getSubjectByCode(this.filteredSchoolDetails?.subjects || [], thurs[0]) as SchoolSubject
        const thursStaff: SchoolStaffWithSchool_DistrictDto = this.getStaffByFullName(this.filteredSchoolDetails?.staffList || [], thurs[1]) as SchoolStaffWithSchool_DistrictDto
        ttLessons.push({ id: "", lessonDay: "thursday", schoolClass, subject: thursSubject, startTime, endTime, schoolStaff: thursStaff })


        const fri: string[] = row.FRIDAY.split(":")
        const friSubject: SchoolSubject = this.getSubjectByCode(this.filteredSchoolDetails?.subjects || [], fri[0]) as SchoolSubject
        const friStaff: SchoolStaffWithSchool_DistrictDto = this.getStaffByFullName(this.filteredSchoolDetails?.staffList || [], fri[1]) as SchoolStaffWithSchool_DistrictDto
        ttLessons.push({ id: "", lessonDay: "friday", schoolClass, subject: friSubject, startTime, endTime, schoolStaff: friStaff })


        return ttLessons;
      })

    })

    const schoolTimeTable: SchoolTimeTable = {
      id: '',
      school: this.school,
      academicTerm: this.academicTerm,
      timeTableLessons: lessons
    }

    return schoolTimeTable;
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


  onSubjectChange(event: MatSelectChange, row: TimeTableRowExcel, day: DayOfWeek) {
    console.log('onSubjectChange', event.value);
    console.log('SELECTED ROW', row);

    const subject: SchoolSubject = event.value

    switch (day) {
      case DayOfWeek.MONDAY:
        // update monday subject
        const monStaff: string = row.MONDAY.split(':')[1] // staff
        row.MONDAY = `${subject.code}:${monStaff}`
        break;
      case DayOfWeek.TUESDAY:
        const tueStaff: string = row.TUESDAY.split(':')[1] // staff
        row.TUESDAY = `${subject.code}:${tueStaff}`
        break;
      case DayOfWeek.WEDNESDAY:
        const wedStaff: string = row.WEDNESDAY.split(':')[1] // staff
        row.WEDNESDAY = `${subject.code}:${wedStaff}`
        break;
      case DayOfWeek.THURSDAY:
        const thurStaff: string = row.THURSDAY.split(':')[1] // staff
        row.THURSDAY = `${subject.code}:${thurStaff}`
        break;
      case DayOfWeek.FRIDAY:
        const friStaff: string = row.FRIDAY.split(':')[1] // staff
        row.FRIDAY = `${subject.code}:${friStaff}`
        break;
      default: console.log("Invalid DAY ", day.name())
    }

    // // get original row
    // row.MONDAY
    // // update its subject value
  }

  onStaffChange(event: MatSelectChange, row: TimeTableRowExcel, day: DayOfWeek) {
    console.log('onSubjectChange', event.value);
    console.log('SELECTED ROW', row);

    const staff: SchoolStaffWithSchool_DistrictDto = event.value

    switch (day) {
      case DayOfWeek.MONDAY:
        // update monday staff
        const monSub: string = row.MONDAY.split(':')[0] // subject
        row.MONDAY = `${monSub}:${staff.firstName} ${staff.lastName}`
        break;
      case DayOfWeek.TUESDAY:
        const tueSub: string = row.TUESDAY.split(':')[0] // subject
        row.TUESDAY = `${tueSub}:${staff.firstName} ${staff.lastName}`
        break;
      case DayOfWeek.WEDNESDAY:
        const wedSub: string = row.WEDNESDAY.split(':')[0] // subject
        row.WEDNESDAY = `${wedSub}:${staff.firstName} ${staff.lastName}`
        break;
      case DayOfWeek.THURSDAY:
        const thurSub: string = row.THURSDAY.split(':')[0] // subject
        row.THURSDAY = `${thurSub}:${staff.firstName} ${staff.lastName}`
        break;
      case DayOfWeek.FRIDAY:
        const friSub: string = row.FRIDAY.split(':')[0] // subject
        row.FRIDAY = `${friSub}:${staff.firstName} ${staff.lastName}`
        break;
      default: console.log("Invalid DAY ", day.name())
    }

    // // get original row
    // row.MONDAY
    // // update its subject value
  }


  saveTimetable() {
    // console.log("timeTable")
    const schoolTimetable: SchoolTimeTable | null = this.convertExcelTimetableToTimetable(this.timeTableExcels);

    if (schoolTimetable) {
      const someInvalid: boolean = schoolTimetable.timeTableLessons.some(lesson => (lesson.schoolStaff == undefined || lesson.subject == undefined))
      if (someInvalid) {
        const invalidLessons: SchoolTimeTableLesson[] = schoolTimetable.timeTableLessons.filter(lesson => (lesson.schoolStaff == undefined || lesson.subject == undefined))
        const invalidByClass: Dictionary<SchoolTimeTableLesson[]> = groupBy(invalidLessons, (lesson) => lesson.schoolClass.name)

        console.log("invalidByClass " , invalidByClass)

        this.invalidLessonCounts = Object.keys(invalidByClass).map(className => ({ name: className, count: invalidByClass[className].length }))
        // console.log(this.invalidLessonCounts)

      } else {
        // upload to server
        console.log("IS ready to upload ", schoolTimetable)
        // update class details
        const lessons: SchoolTimeTableLesson[] = schoolTimetable?.timeTableLessons.map(l => {
          const schoolClass: SchoolClass | undefined = this.filteredSchoolDetails?.schoolClasses.find(sl => sl.name === l.schoolClass.name)
          if (schoolClass) {
            l.schoolClass = { ...schoolClass }
          }
          return l
        }) as []

        schoolTimetable.timeTableLessons = lessons
        schoolTimetable.academicTerm = this.filteredSchoolDetails?.term as AcademicTerm
        schoolTimetable.school = this.filteredSchoolDetails?.school as School
        this.uploadToServer(schoolTimetable)
      }
    }

  }


  uploadToServer(schoolTimetable:SchoolTimeTable){
          this.isUploading = true;
      const _$: Subscription = this.schoolFilterService.uploadTimetable(schoolTimetable).subscribe({
        next: response => {
          this.isUploading = false;
          console.log(response)
          this.toastr.success(response.data)
        },
        error: (error:HttpErrorResponse) => {
          this.isUploading = false;
        //  this.toastr.warning(error.error.error.message)
          console.log("ERROR " , error.error.error.errorCode)
          if(error.error.error.errorCode == 409){
            this.toastr.warning(`Timetable of ${this.filteredSchoolDetails?.school?.name} for ${this.filteredSchoolDetails?.term?.term} Already exists  , for changes update`)
          }

        },
        complete: () => _$.unsubscribe()
      })
  }
// HttpErrorResponse
}
