import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalTime } from '@js-joda/core';


@Component({
  selector: 'app-start-end-break-lunch-time',
  templateUrl: './start-end-break-lunch-time.component.html',
  styleUrls: ['./start-end-break-lunch-time.component.scss']
})
export class StartEndBreakLunchTimeComponent implements OnInit {


  formGroup !:FormGroup

  @Output() classStartEndBreakLunchTimeData:EventEmitter<ClassStartEndBreakLunchTime> = new EventEmitter<ClassStartEndBreakLunchTime>()
  @Output() isInValid:EventEmitter<boolean> = new EventEmitter<boolean>()



  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      classStartTime: [LocalTime.of(8,30) , Validators.required],
      classEndTime: [LocalTime.of(17,0) , Validators.required],
      duration:[30 , Validators.required],

      breakStartTime: [LocalTime.of(10,30) , Validators.required],
      breakEndTime:[LocalTime.of(11,0) , Validators.required],

      lunchStartTime:[LocalTime.of(13,0) , Validators.required],
      lunchEndTime:[LocalTime.of(14,0) , Validators.required]
    })

    this.classStartEndBreakLunchTimeData.next(this.formData)
    this.isInValid.next(this.formGroup.invalid)

    this.formGroup.valueChanges.subscribe(_data => {
      this.classStartEndBreakLunchTimeData.next(this.formData)
      this.isInValid.next(this.formGroup.invalid)
    })
  }

  get formData(){
    return this.formGroup.value
  }

}

export interface ClassStartEndBreakLunchTime{
  classStartTime:string|LocalTime;
  classEndTime:string|LocalTime;
  duration:number;
  breakStartTime:string|LocalTime
  breakEndTime:string|LocalTime
  lunchStartTime:string|LocalTime
  lunchEndTime:string|LocalTime
}
