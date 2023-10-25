import { TimeTableExcel } from '../shared/timetable-uploader.directive';
import { SampleSchool, School } from './dto/dto';
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
  // timetableLessonsGroupedByTime: Dictionary<TimeTableLesson[]> = groupBy(this.sampleTimetable.lessons, (lesson) => lesson.time())
  // timetableTimes: string[] = Object.keys(this.timetableLessonsGroupedByTime).sort()
  DayOfWeek = DayOfWeek
  isUploading: boolean = false
  uploadControl:FormControl = new FormControl()

  timeTableExcels:TimeTableExcel[] = []

  ngOnInit(): void {

    // group lessons by time
    // console.log(groupBy(this.sampleTimetable.lessons, (lesson) => lesson.time()))
    // console.log(Object.keys(this.timetableLessonsGroupedByTime))
    // console.log(this.timetableLessonsGroupedByTime[this.timetableTimes[0]])

    // console.log("sorted ", this.getLessonsByDayOfWeek(this.timetableLessonsGroupedByTime[this.timetableTimes[0]], DayOfWeek.FRIDAY))


  }

 // getLessonsByDayOfWeek = (lessons: TimeTableLesson[], dayOfWeek: DayOfWeek): TimeTableLesson => { return lessons.find(lesson => lesson.dayOfWeek === dayOfWeek) as TimeTableLesson }


  excelData(timeTableExcels: TimeTableExcel[]) {
    this.timeTableExcels = timeTableExcels
    console.log('timeTableExcels ' , timeTableExcels)
  }



  isUploadingEvent(status: boolean) {
    console.log('isUploadingEvent ', status)
    if (!status){
      this.uploadControl.reset()
    }
  }


}
