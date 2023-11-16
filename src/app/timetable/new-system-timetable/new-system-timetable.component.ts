import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FilteredSchoolDetails } from '../school-filter/school-filter.component';
import { SchoolFilterService } from '../school-filter/school-filter.service';
import { FormControl } from '@angular/forms';
import { LocalTime } from '@js-joda/core';
import { TelaTimetablePattern } from 'src/app/shared/TelaDateTimePattern';
import { distinctUntilChanged } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-new-system-timetable',
  templateUrl: './new-system-timetable.component.html',
  styleUrls: ['./new-system-timetable.component.scss']
})
export class NewSystemTimetableComponent implements OnInit {



  filteredSchoolDetails: FilteredSchoolDetails | null = null
  startTimeControl:FormControl = new FormControl(LocalTime.of(8,0).format(TelaTimetablePattern));
  endTimeControl:FormControl = new FormControl(LocalTime.of(17,0).format(TelaTimetablePattern));
  durationControl:FormControl = new FormControl(40);


  startEndTimeRanges:TimeRange[] = []

  constructor(private router:Router , private toastr:ToastrService , private schoolFilterService:SchoolFilterService) { }

  ngOnInit(): void {

    this.startEndTimeRanges = this.generateTimetablePeriods(LocalTime.of(8,0) , LocalTime.of(17,0) , 40)

    this.startTimeControl.valueChanges
    .pipe(distinctUntilChanged())
    .subscribe(value => {
     const startTime:LocalTime =  LocalTime.parse(value)
     const endTime:LocalTime =  LocalTime.parse(this.endTimeControl.value)
     if(startTime.isAfter(endTime)){
      this.toastr.warning("Start time cannot be greater than end time")
      this.startTimeControl.patchValue(LocalTime.of(8,0).format(TelaTimetablePattern))
      return
     }

     this.startEndTimeRanges = this.generateTimetablePeriods(startTime , endTime , this.durationControl.value)
    //  console.log(this.startEndRanges)
    })


    this.endTimeControl.valueChanges
    .pipe(distinctUntilChanged())
    .subscribe(value => {
      const endTime:LocalTime =  LocalTime.parse(value)
      const startTime:LocalTime =  LocalTime.parse(this.startTimeControl.value)
      if(endTime.isBefore(startTime)){
        this.toastr.warning("End time cannot be before start time")
        this.startTimeControl.patchValue(LocalTime.of(17,0).format(TelaTimetablePattern))
        return
       }
       this.startEndTimeRanges = this.generateTimetablePeriods(startTime , endTime , this.durationControl.value)
      //  console.log(this.startEndRanges)
    })

    this.durationControl.valueChanges
    .pipe(distinctUntilChanged())
    .subscribe(duration => {
      const endTime:LocalTime =  LocalTime.parse(this.endTimeControl.value)
      const startTime:LocalTime =  LocalTime.parse(this.startTimeControl.value)
      if(endTime.isBefore(startTime)){
        this.toastr.warning("End time cannot be before start time")
        this.startTimeControl.patchValue(LocalTime.of(17,0).format(TelaTimetablePattern))
        return
       }
       this.startEndTimeRanges = this.generateTimetablePeriods(startTime , endTime , duration)
      //  console.log(this.startEndRanges)
    })

  }

  generateTimetable() {
    this.startEndTimeRanges = this.generateTimetablePeriods(LocalTime.parse(this.startTimeControl.value) , LocalTime.parse(this.endTimeControl.value) , this.durationControl.value)
         console.log(this.startEndTimeRanges)
    }


  generateTimetablePeriods(startTime: LocalTime, endTime: LocalTime , duration:number){
    const periods:TimeRange[] = []
    let startTimeString:string = startTime.format(TelaTimetablePattern)
    while(LocalTime.parse(startTimeString).isBefore(endTime) || LocalTime.parse(startTimeString).equals(endTime)){
      let timerange:TimeRange = {startTime:LocalTime.parse(startTimeString) , endTime:LocalTime.now()} // set start time
      startTimeString = LocalTime.parse(startTimeString).plusMinutes(duration).format(TelaTimetablePattern)
      timerange.endTime = LocalTime.parse(startTimeString) // set end time
    //  console.log(startTimeString)
     periods.push(timerange)
    }

    return periods
  }


  onStaffChange($event: MatSelectChange) {
    console.log($event)
    }
    onSubjectChange($event: MatSelectChange) {
      console.log($event)
    }




}

interface TimeRange{
  startTime:LocalTime
  endTime:LocalTime
}
