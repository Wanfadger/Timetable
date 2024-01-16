import { LocalTime } from "@js-joda/core"

export interface DbTimetable{
  id:string
  breakTime:string
  lunchTime:string
  lessons:DbTimetableLesson[]
}

export interface NewDbTimetable{
  school:{id:string},
  academicTerm:{id:string},
  lessons:NewDbTimetableLesson[]
}


export interface NewDbTimetableLesson{
  id:string|null,
  startTime:string, //lesson
  endTime:string, // lesson
  lessonDay:string|null,
  duration:number;
  breakStartTime:string
  breakEndTime:string
  lunchStartTime:string
  lunchEndTime:string
  classStartTime:string
  classEndTime:string
  schoolClass:DbTimetableClass|null,
  subject:DbTimetableSubject|null,
  schoolStaff:DbTimetableStaff|null
}


export interface DbTimetableLesson{
  id:string,
  startTime:string,
  endTime:string,
  lessonDay:string,
  duration:number;
  breakStartTime:string
  breakEndTime:string
  lunchStartTime:string
  lunchEndTime:string
  classStartTime:string
  classEndTime:string
  schoolClass:DbTimetableClass,
  subject:DbTimetableSubject,
  schoolStaff:DbTimetableStaff
}

export interface DbTimetableStaff{
  id:string , firstName:string, lastName:string
}

export interface DbTimetableSubject{
  id:string ,code:string, name:string
}

export interface DbTimetableClass{
  id:string , name:string
}


export interface TimeRange {
  startTime: LocalTime
  endTime: LocalTime
}

export interface User {
  name: string;
}
