
/// <reference lib="webworker" />

import * as XLSX from 'xlsx'



addEventListener('message', ({ data }) => {
  const workBook: XLSX.WorkBook = XLSX.read(data, { type: "buffer" })
  const wsnames: string[] = workBook.SheetNames
  postMessage(JSON.stringify(convertWorkSheetToTimetable(workBook, wsnames)));
});


function convertWorkSheetToTimetable(workBook: XLSX.WorkBook, workSheetNames: string[]): TimeTableExcel[] {
  return workSheetNames.map(workSheetName => {
    const sheet: XLSX.WorkSheet = workBook.Sheets[workSheetName]
    let datas: TimeTableRowExcel[] = XLSX.utils.sheet_to_json<TimeTableRowExcel>(sheet, { defval: "", blankrows: false })
    const timetable: TimeTableExcel = { schoolClass: { id: "", name: workSheetName }, rows: datas }

    return timetable
  })
}

interface TimeTableRowExcel {
  TIME: string
  MONDAY: string
  TUESDAY: string
  WEDNESDAY: string
  THURSDAY: string
  FRIDAY: string
}


interface TimeTableExcel {
  schoolClass: SchoolClass
  rows: TimeTableRowExcel[]
}

interface SchoolClass { id: string, name: string, academicTerm?: AcademicTerm }
interface AcademicTerm { id: string, term: string }
