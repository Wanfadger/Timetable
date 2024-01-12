import { Component, Inject, OnInit } from '@angular/core';
import { TimeRange } from '../new-system-timetable/new-system-timetable.component';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LocalTime } from '@js-joda/core';
import { TelaTimetablePattern } from 'src/app/shared/TelaDateTimePattern';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-missing-break-lunch-time-dialog',
  templateUrl: './missing-break-lunch-time-dialog.component.html',
  styleUrls: ['./missing-break-lunch-time-dialog.component.scss']
})

/**
 * @deprecated
 */
export class MissingBreakLunchTimeDialogComponent implements OnInit {



  invalid: boolean = false;

  breakTimeControl: FormControl = new FormControl(null, Validators.required)
  lunchTimeControl: FormControl = new FormControl(null, Validators.required)

  lunchTimes: TimeRange[] = this.getLunchTimes(this.data)

  constructor(public dialogRef: MatDialogRef<MissingBreakLunchTimeDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: TimeRange[], private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.lunchTimes.length <= 0) {
      // console.log("no lunch")
     this.lunchTimeControl = new FormControl(null)
    }
  }

  onLunchChange(event: MatSelectChange) {
    // console.log(event.value)
    const lunchTimes = event.value as TimeRange[];
    // console.log(lunchTime)
    const breakTime = this.breakTimeControl.value as TimeRange;

    if (lunchTimes.length > 0) {
      // BREAK CANNOT BE AFTER LUNCH TIME
      if (lunchTimes.some(l => l.startTime.isBefore(breakTime.startTime)) || lunchTimes.some(l => l.startTime.equals(breakTime.startTime))) {
        this.toastr.warning("Any Lunch time cannot be before or equal Break time")
        this.invalid = true;
      } else {
        this.invalid = false;
      }
    }else{
      this.invalid = true;
    }


  }
  onBreakChange(event: MatSelectChange) {
    const breakTime = event.value as TimeRange;
    // console.log(breakTime)
    const lunchTime = this.lunchTimeControl.value as TimeRange
    if (lunchTime) {
      // BREAK CANNOT BE AFTER LUNCH TIME
      if (breakTime.startTime.isAfter(lunchTime.startTime) || breakTime.startTime.equals(lunchTime.startTime)) {
        this.toastr.warning("Break time cannot be after or equal lunch time")
        this.invalid = true;
      } else {
        this.invalid = false;
      }
    }
  }


  compareWith(a: TimeRange, b: TimeRange) {
    return a && b ? a.startTime.format(TelaTimetablePattern) == b.startTime.format(TelaTimetablePattern) : a == b
  }

  getBreakTimes(times: TimeRange[]) {
    return times.filter(ttr => ttr.startTime.isBefore(LocalTime.of(12, 0)))
  }

  getLunchTimes(times: TimeRange[]) {
    return times.filter(ttr => ttr.startTime.isAfter(LocalTime.of(12, 59)))
  }



  close() {
    this.dialogRef.close(null)
  }

  done() {
    // console.log('data ', { b: this.breakTimeControl.value as TimeRange, l: this.lunchTimeControl.value as TimeRange[] })
    this.dialogRef.close({ b: this.breakTimeControl.value as TimeRange, l: this.lunchTimeControl.value as TimeRange })
  }

}
