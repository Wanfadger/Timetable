import { Directive, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import * as XLSX from 'xlsx'
import { includes } from 'lodash';
import { SchoolClass } from 'src/app/dto/dto';

@Directive({
  selector: '[appTimetableExcelUploader]'
})
export class TimetableExcelDirective implements OnInit, OnDestroy {
  @Output() excelDataEvent: EventEmitter<TimeTableExcel[]> = new EventEmitter();
  @Input() sheetIndex !: number
  @Output() isUploadingEvent: EventEmitter<boolean> = new EventEmitter();
  format = ['csv', 'text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']

  uploadWorker !: Worker
  constructor(private _el: ElementRef) { }



  ngOnInit(): void {
   this.uploadWorker = new Worker(new URL('../../src/app/upload-timetable.worker.ts', import.meta.url))
  }

  ngOnDestroy(): void {
   this.uploadWorker.terminate()
  }

  @HostListener("change")
  onchange() {
    const files: FileList = this._el.nativeElement.files

    const file: File | null = files.item(0)
    if (includes(this.format, file?.type)) {
      if (file) this.readFile(file)
    } else {
      alert(`Invalid file format ${file?.type} \n \n Only EXCEL and CSV files are  Allowed!`)
    }

  }

  readFile(file: File) {
    this.isUploadingEvent.next(true)

    const fileReader: FileReader = new FileReader()
    fileReader.readAsArrayBuffer(file)

    fileReader.onload = (ev: ProgressEvent<FileReader>) => {
      const arrayBuffer = ev.target?.result
      this.uploadWorker.postMessage(arrayBuffer)
      this.uploadWorker.onmessage = ({data}) => {
        this.excelDataEvent.emit(JSON.parse(data))
        // this.excelDataEvent.emit(this.convertWorkSheetToTimetable(workBook, wsnames))
        this.isUploadingEvent.next(false)
      }
    }
  }


  convertWorkSheetToTimetable(workBook: XLSX.WorkBook, workSheetNames: string[]): TimeTableExcel[] {
    return workSheetNames.map(workSheetName => {
      const sheet: XLSX.WorkSheet = workBook.Sheets[workSheetName]
      let datas: TimeTableRowExcel[] = XLSX.utils.sheet_to_json<TimeTableRowExcel>(sheet, { defval: "", blankrows: false })
      const timetable: TimeTableExcel = { schoolClass: { id: "123", name: workSheetName }, rows: datas }

      return timetable
    })
  }

}







export interface TimeTableRowExcel {
  TIME: string
  MONDAY: string
  TUESDAY: string
  WEDNESDAY: string
  THURSDAY: string
  FRIDAY: string
}


export interface TimeTableExcel {
  schoolClass: SchoolClass
  rows: TimeTableRowExcel[]
}




