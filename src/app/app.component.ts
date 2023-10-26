import { TimeTableExcel } from '../shared/timetable-uploader.directive';
import { AcademicTerm, DbSchoolClass, DbStaffs, DbSubjects, SampleSchool, School, SchoolClass, SchoolStaff, SchoolTimeTable, SchoolTimeTableLesson, Subject } from './dto/dto';
import { Component, OnInit } from '@angular/core';
import { DayOfWeek } from '@js-joda/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {



  title = 'shool-timetable-generator-prototype';
  school: School = SampleSchool
  academicTerm: AcademicTerm = AcademicTerm
  DayOfWeek = DayOfWeek
  isUploading: boolean = false
  uploadControl: FormControl = new FormControl()

  timeTableExcels: TimeTableExcel[] = []
  dbStaffs: SchoolStaff[] = DbStaffs
  dbSubjects: Subject[] = DbSubjects
  dbSchoolClass: SchoolClass[] = DbSchoolClass

  ngOnInit(): void {
    // console.log(this.getStaffByFullName(this.dbStaffs, "Galiwango Fahad"))
  }

  excelData(timeTableExcels: TimeTableExcel[]) {
    this.timeTableExcels = timeTableExcels
    // console.log('timeTableExcels ', timeTableExcels)


    console.log("timeTable")
    console.log(this.convertExcelTimetableToTimetable(timeTableExcels))
  }



  isUploadingEvent(status: boolean) {
    // console.log('isUploadingEvent ', status)
    if (!status) {
      this.uploadControl.reset()
    }
  }


  getStaffByFullName(schoolStaffs: SchoolStaff[], fullName: string): SchoolStaff | undefined {
    const names: string[] = fullName.split(" ")
    let firstName: string = ''
    let lastName: string = '' // incase name is more than 2
    if (names.length > 0) {
      firstName = names.length > 0 ? names[0] : ''
      const names2 = [...names]
      names2.splice(0, 1) // removes firstname
      lastName = names2.join(" ")  // incase name is more than 2
    }
    const selectedStaff: SchoolStaff | undefined = schoolStaffs
      .find(staff => (staff.firstName.toLocaleLowerCase() === firstName.toLocaleLowerCase()) && (staff.lastName.toLocaleLowerCase() === lastName.toLocaleLowerCase()))
    return selectedStaff
  }


  getSubjectByCode(subjects: Subject[], code: string): Subject | undefined {
    return subjects
      .find(sub => (sub.code.toLocaleLowerCase() === code.toLocaleLowerCase()) && (sub.code.toLocaleLowerCase() === code.toLocaleLowerCase()))
  }

  getSchoolClassByName(schoolClasses: SchoolClass[], name: string): SchoolClass | undefined {
    return schoolClasses
      .find(schoolClasse => (schoolClasse.name.toLocaleLowerCase() === name.toLocaleLowerCase()) && (schoolClasse.name.toLocaleLowerCase() === name.toLocaleLowerCase()))
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
        const monSubject: Subject = this.getSubjectByCode(this.dbSubjects, mon[0]) as Subject
        const monStaff: SchoolStaff = this.getStaffByFullName(this.dbStaffs, mon[1]) as SchoolStaff
        ttLessons.push({ id: "", lessonDay: "monday", schoolClass, subject: monSubject, startTime, endTime, schoolStaff: monStaff })


        const tue: string[] = row.TUESDAY.split(":")
        const tueSubject: Subject = this.getSubjectByCode(this.dbSubjects, tue[0]) as Subject
        const tueStaff: SchoolStaff = this.getStaffByFullName(this.dbStaffs, tue[1]) as SchoolStaff
        ttLessons.push({ id: "", lessonDay: "tuesday", schoolClass, subject: tueSubject, startTime, endTime, schoolStaff: tueStaff })

        const wed: string[] = row.WEDNESDAY.split(":")
        const wedSubject: Subject = this.getSubjectByCode(this.dbSubjects, wed[0]) as Subject
        const wedStaff: SchoolStaff = this.getStaffByFullName(this.dbStaffs, wed[1]) as SchoolStaff
        ttLessons.push({ id: "", lessonDay: "wednesday", schoolClass, subject: wedSubject, startTime, endTime, schoolStaff: wedStaff })


        const thurs: string[] = row.THURSDAY.split(":")
        const thursSubject: Subject = this.getSubjectByCode(this.dbSubjects, thurs[0]) as Subject
        const thursStaff: SchoolStaff = this.getStaffByFullName(this.dbStaffs, thurs[1]) as SchoolStaff
        ttLessons.push({ id: "", lessonDay: "thursday", schoolClass, subject: thursSubject, startTime, endTime, schoolStaff: thursStaff })


        const fri: string[] = row.FRIDAY.split(":")
        const friSubject: Subject = this.getSubjectByCode(this.dbSubjects, fri[0]) as Subject
        const friStaff: SchoolStaff = this.getStaffByFullName(this.dbStaffs, fri[1]) as SchoolStaff
        ttLessons.push({ id: "", lessonDay: "friday", schoolClass, subject: friSubject, startTime, endTime, schoolStaff: friStaff })


        return ttLessons;
      })

    })

    const schoolTimeTable: SchoolTimeTable = {
      id: "string",
      school: this.school,
      academicTerm: this.academicTerm,
      timeTableLessons: lessons
    }

    return schoolTimeTable;
  }


}
