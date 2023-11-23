import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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
      classStartTime: ['08:30', Validators.required],
      classEndTime: ['13:00' , Validators.required],
      duration:[30 , Validators.required],

      breakStartTime: ['10:30' , Validators.required],
      breakEndTime:['11:00' , Validators.required],

      lunchStartTime:['13:00' , Validators.required],
      lunchEndTime:['14:00' , Validators.required]
    })

    this.classStartEndBreakLunchTimeData.next(this.formGroup.value)
    this.isInValid.next(this.formGroup.invalid)


    this.formGroup.valueChanges.subscribe(data => {
      this.classStartEndBreakLunchTimeData.next(this.formData)
      this.isInValid.next(this.formGroup.invalid)
    })
  }

  get formData(){
    return this.formGroup.value
  }

}

export interface ClassStartEndBreakLunchTime{
  classStartTime:string
  classEndTime:string
  duration:number
  breakStartTime:string
  breakEndTime:string
  lunchStartTime:string
  lunchEndTime:string
}
