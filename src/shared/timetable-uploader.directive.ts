import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import * as XLSX from 'xlsx'
import * as Lodash from 'lodash'
import { SchoolClass } from 'src/app/dto/dto';

@Directive({
  selector: '[appTimetableExcelUploader]'
})
export class TimetableExcelDirective {
  @Output() excelDataEvent: EventEmitter<TimeTableExcel []> = new EventEmitter();
  @Input() sheetIndex !: number
  @Output() isUploadingEvent: EventEmitter<boolean> = new EventEmitter();
   format = ['csv' , 'text/csv' , 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']


  constructor(private _el: ElementRef ) { }

  @HostListener("change")
  onchange() {
    const files: FileList = this._el.nativeElement.files

    const file: File | null = files.item(0)
    if (Lodash.includes(this.format , file?.type)){
      if (file) this.readFile(file)
    }else{
      alert(`Invalid file format ${file?.type} \n \n Only EXCEL and CSV files are  Allowed!`)
    }

  }

  readFile(file: File) {
    this.isUploadingEvent.next(true)

    const fileReader: FileReader = new FileReader()
    fileReader.readAsArrayBuffer(file)

    fileReader.onload = (ev: ProgressEvent<FileReader>) => {

      const arrayBuffer = ev.target?.result

      const workBook: XLSX.WorkBook = XLSX.read(arrayBuffer, {type:"buffer"})

      const wsnames: string[] = workBook.SheetNames
      // console.log(wsnames)
      // this.sheetIndex = this.sheetIndex ? this.sheetIndex : 1
      // const wsname = wsnames[this.sheetIndex - 1]
      // console.log("SHETTS " , workBook.Sheets)
      // const ws: XLSX.WorkSheet = workBook.Sheets[wsname]
      // let datas: TimeTableRowExcel[] = XLSX.utils.sheet_to_json<TimeTableRowExcel>(ws , {defval:"" , blankrows:false})
      // const timetable:TimeTableExcel = {schoolClass:{id:"123" , name:wsname} , rows:datas}
      this.excelDataEvent.emit(this.convertWorkSheetToTimetable(workBook , wsnames))
      this.isUploadingEvent.next(false)
    }
  }


  convertWorkSheetToTimetable(workBook: XLSX.WorkBook , workSheetNames: string[]):TimeTableExcel[]{
   return workSheetNames.map(workSheetName => {
      const sheet: XLSX.WorkSheet = workBook.Sheets[workSheetName]
      let datas: TimeTableRowExcel[] = XLSX.utils.sheet_to_json<TimeTableRowExcel>(sheet , {defval:"" , blankrows:false})
      const timetable:TimeTableExcel = {schoolClass:{id:"123" , name:workSheetName} , rows:datas}

      return timetable
   })
  }

}







export interface TimeTableRowExcel {
  TIME:string
  MONDAY:string
  TUESDAY:string
  WEDNESDAY:string
  THURSDAY:string
  FRIDAY:string
}


export interface TimeTableExcel {
  schoolClass: SchoolClass
  rows:TimeTableRowExcel[]
}




