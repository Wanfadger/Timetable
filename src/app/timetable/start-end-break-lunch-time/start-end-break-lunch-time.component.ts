import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-start-end-break-lunch-time',
  templateUrl: './start-end-break-lunch-time.component.html',
  styleUrls: ['./start-end-break-lunch-time.component.scss']
})
export class StartEndBreakLunchTimeComponent implements OnInit {


  formGroup !:FormGroup

  @Output() StartEndBreakLunchTimeData:EventEmitter<StartEndBreakLunchTime> = new EventEmitter<StartEndBreakLunchTime>()
  @Output() isInValid:EventEmitter<boolean> = new EventEmitter<boolean>()



  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      startTime: [null , Validators.required],
      endTime: [null , Validators.required],
      duration:[null , Validators.required],

      breakStartTime: [null , Validators.required],
      breakEndTime:[null , Validators.required],

      lunchStartTime:[null , Validators.required],
      lunchEndTime:[null , Validators.required]
    })

    this.formGroup.valueChanges.subscribe(_data => {
      this.StartEndBreakLunchTimeData.next(this.formData)
      this.isInValid.next(this.formGroup.invalid)
    })
  }

  get formData(){
    return this.formGroup.value
  }

}

export interface StartEndBreakLunchTime{
  startTime:string;
  endTime:string;
  duration:number;
  breakStartTime:string
  breakEndTime:string
  lunchStartTime:string
  lunchEndTime:string
}
