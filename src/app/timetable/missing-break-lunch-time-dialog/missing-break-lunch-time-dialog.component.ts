import { Component, Inject, OnInit } from '@angular/core';
import { TimeRange } from '../new-system-timetable/new-system-timetable.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LocalTime } from '@js-joda/core';

@Component({
  selector: 'app-missing-break-lunch-time-dialog',
  templateUrl: './missing-break-lunch-time-dialog.component.html',
  styleUrls: ['./missing-break-lunch-time-dialog.component.scss']
})
export class MissingBreakLunchTimeDialogComponent implements OnInit {


  invalid:boolean = false;

  formGroup !: FormGroup

  constructor(public dialogRef: MatDialogRef<MissingBreakLunchTimeDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: TimeRange[], private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      breakTime: [null, [Validators.required]],
      lunchTime: [null, [Validators.required]]
    })

    this.formGroup.get("breakTime")?.valueChanges.subscribe((breakTime: TimeRange) => {
      console.log(breakTime)
      const lunchTime = this.formGroup.get("lunchTime")?.value as TimeRange
      if (lunchTime) {
        // BREAK CANNOT BE AFTER LUNCH TIME
        if (breakTime.startTime.isAfter(lunchTime.startTime)) {
          this.toastr.warning("Break time cannot be after lunck time")
          this.invalid = true;
        }else{
          this.invalid = false;
        }
      }
    })

    this.formGroup.get("lunchTime")?.valueChanges.subscribe((lunchTime: TimeRange) => {
      const breakTime = this.formGroup.get("breakTime")?.value as TimeRange;
      if (lunchTime) {
        // BREAK CANNOT BE AFTER LUNCH TIME
        if (lunchTime.startTime.isAfter(breakTime.startTime)) {
          this.toastr.warning("Lunch time cannot be before Break time")
          this.invalid = true;
        }else{
          this.invalid = false;
        }
      }
    })

  }

  getBreakTimes(times:TimeRange[]){
    return times.filter(ttr => ttr.startTime.isBefore(LocalTime.of(13,0)))
  }

  getLunchTimes(times:TimeRange[]){
    return times.filter(ttr => ttr.startTime.isAfter(LocalTime.of(12,0)))
  }

  get formData(){
    return this.formGroup.value
  }

  close() {
    this.dialogRef.close(null)
  }

  done() {
    this.dialogRef.close({b:this.formData.breakTime as TimeRange , l:this.formData.lunchTime as TimeRange})
  }

}
