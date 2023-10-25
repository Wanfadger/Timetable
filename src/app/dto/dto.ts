
import { DayOfWeek, LocalTime } from '@js-joda/core';
import { type } from 'os';

export interface AcademicTerm {
  id: string
  term: "Term III"
}

export interface School {
  id: string
  name: string
  schoolLevel: string
  schoolClasses: SchoolClass[]
}

export interface SchoolClass {
  id: string
  name: string
  academicTerm?: AcademicTerm
}

const academicTerm: AcademicTerm = { id: "termIII", term: "Term III" }




export const SampleSchool: School = {
  id: "sampleId1", name: "Sample Primary School", schoolLevel: "Primary",
  schoolClasses: [
    { id: "class1", name: "P.1", academicTerm },
    { id: "class2", name: "P.2", academicTerm },
    { id: "class3", name: "P.3", academicTerm },
    { id: "class4", name: "P.4", academicTerm },
    { id: "class5", name: "P.5", academicTerm },
    { id: "class6", name: "P.6", academicTerm },
    { id: "class7", name: "P.7", academicTerm },
  ]
}

const staff: SchoolStaff = { id: "termIII", firstName: "Galiwango", lastName: "Fahad", school: SampleSchool }






export const SampleTimetable: TimeTable = {
  schoolClass: { id: "class1", name: "P.1", academicTerm },
  rows: [
    {
      time: "8:00 am-9:00 am",
      monday: { staff, subject: { id: "sub1", name: "ENG" }},
      tueday: { staff, subject: { id: "sub1", name: "ENG" }},
      wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
      thursday: { staff, subject: { id: "sub1", name: "ENG" }},
      friday: { staff, subject: { id: "sub1", name: "ENG" }},
    },
    {
      time: "9:00 am-10:00 am",
      monday: { staff, subject: { id: "sub1", name: "ENG" }},
      tueday: { staff, subject: { id: "sub1", name: "ENG" }},
      wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
      thursday: { staff, subject: { id: "sub1", name: "ENG" }},
      friday: { staff, subject: { id: "sub1", name: "ENG" }},
    },
    {
      time: "11:00 am-12:00 am",
      monday: { staff, subject: { id: "sub1", name: "ENG" }},
      tueday: { staff, subject: { id: "sub1", name: "ENG" }},
      wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
      thursday: { staff, subject: { id: "sub1", name: "ENG" }},
      friday: { staff, subject: { id: "sub1", name: "ENG" }},
    },
    {
      time: "12:00 am-1:00 pm",
      monday: { staff, subject: { id: "sub1", name: "ENG" }},
      tueday: { staff, subject: { id: "sub1", name: "ENG" }},
      wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
      thursday: { staff, subject: { id: "sub1", name: "ENG" }},
      friday: { staff, subject: { id: "sub1", name: "ENG" }},
    },
    {
      time: "2:00 pm-3:00 pm",
      monday: { staff, subject: { id: "sub1", name: "ENG" }},
      tueday: { staff, subject: { id: "sub1", name: "ENG" }},
      wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
      thursday: { staff, subject: { id: "sub1", name: "ENG" }},
      friday: { staff, subject: { id: "sub1", name: "ENG" }},
    },
    {
      time: "3:00 pm-4:00 pm",
      monday: { staff, subject: { id: "sub1", name: "ENG" }},
      tueday: { staff, subject: { id: "sub1", name: "ENG" }},
      wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
      thursday: { staff, subject: { id: "sub1", name: "ENG" }},
      friday: { staff, subject: { id: "sub1", name: "ENG" }},
    },
    {
      time: "4:00 pm-5:00 pm",
      monday: { staff, subject: { id: "sub1", name: "ENG" }},
      tueday: { staff, subject: { id: "sub1", name: "ENG" }},
      wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
      thursday: { staff, subject: { id: "sub1", name: "ENG" }},
      friday: { staff, subject: { id: "sub1", name: "ENG" }},
    }
  ]
}



export const SampleTimetables: TimeTable[] = [
  {
    schoolClass: { id: "class1", name: "P.1", academicTerm },
    rows: [
      {
        time: "8:00 am-9:00 am",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      },
      {
        time: "9:00 am-10:00 am",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      },
      {
        time: "11:00 am-12:00 am",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      },
      {
        time: "12:00 am-1:00 pm",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      },
      {
        time: "2:00 pm-3:00 pm",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      },
      {
        time: "3:00 pm-4:00 pm",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      },
      {
        time: "4:00 pm-5:00 pm",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      }
    ]
  },
  {
    schoolClass: { id: "class1", name: "P.2", academicTerm },
    rows: [
      {
        time: "8:00 am-9:00 am",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      },
      {
        time: "9:00 am-10:00 am",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      },
      {
        time: "11:00 am-12:00 am",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      },
      {
        time: "12:00 am-1:00 pm",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      },
      {
        time: "2:00 pm-3:00 pm",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      },
      {
        time: "3:00 pm-4:00 pm",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      },
      {
        time: "4:00 pm-5:00 pm",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      }
    ]
  },
  {
    schoolClass: { id: "class1", name: "P.3", academicTerm },
    rows: [
      {
        time: "8:00 am-9:00 am",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      },
      {
        time: "9:00 am-10:00 am",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      },
      {
        time: "11:00 am-12:00 am",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      },
      {
        time: "12:00 am-1:00 pm",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      },
      {
        time: "2:00 pm-3:00 pm",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      },
      {
        time: "3:00 pm-4:00 pm",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      },
      {
        time: "4:00 pm-5:00 pm",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      }
    ]
  },
  {
    schoolClass: { id: "class1", name: "P.4", academicTerm },
    rows: [
      {
        time: "8:00 am-9:00 am",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      },
      {
        time: "9:00 am-10:00 am",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      },
      {
        time: "11:00 am-12:00 am",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      },
      {
        time: "12:00 am-1:00 pm",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      },
      {
        time: "2:00 pm-3:00 pm",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      },
      {
        time: "3:00 pm-4:00 pm",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      },
      {
        time: "4:00 pm-5:00 pm",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      }
    ]
  },
  {
    schoolClass: { id: "class1", name: "P.5", academicTerm },
    rows: [
      {
        time: "8:00 am-9:00 am",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      },
      {
        time: "9:00 am-10:00 am",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      },
      {
        time: "11:00 am-12:00 am",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      },
      {
        time: "12:00 am-1:00 pm",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      },
      {
        time: "2:00 pm-3:00 pm",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      },
      {
        time: "3:00 pm-4:00 pm",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      },
      {
        time: "4:00 pm-5:00 pm",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      }
    ]
  },
  {
    schoolClass: { id: "class1", name: "P.6", academicTerm },
    rows: [
      {
        time: "8:00 am-9:00 am",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      },
      {
        time: "9:00 am-10:00 am",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      },
      {
        time: "11:00 am-12:00 am",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      },
      {
        time: "12:00 am-1:00 pm",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      },
      {
        time: "2:00 pm-3:00 pm",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      },
      {
        time: "3:00 pm-4:00 pm",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      },
      {
        time: "4:00 pm-5:00 pm",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      }
    ]
  },
  {
    schoolClass: { id: "class1", name: "P.7", academicTerm },
    rows: [
      {
        time: "8:00 am-9:00 am",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      },
      {
        time: "9:00 am-10:00 am",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      },
      {
        time: "11:00 am-12:00 am",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      },
      {
        time: "12:00 am-1:00 pm",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      },
      {
        time: "2:00 pm-3:00 pm",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      },
      {
        time: "3:00 pm-4:00 pm",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      },
      {
        time: "4:00 pm-5:00 pm",
        monday: { staff, subject: { id: "sub1", name: "ENG" }},
        tueday: { staff, subject: { id: "sub1", name: "ENG" }},
        wednesday: { staff, subject: { id: "sub1", name: "ENG" }},
        thursday: { staff, subject: { id: "sub1", name: "ENG" }},
        friday: { staff, subject: { id: "sub1", name: "ENG" }},
      }
    ]
  }

]




export interface SchoolStaff {
  id: string
  firstName: string
  lastName: string
  school?: School
}

export interface Subject {
  id: string
  name: string
}

export interface TimeTable {
  schoolClass: SchoolClass
  rows: TimeTableRow[]
}

// export interface TimeTableLesson {
//   dayOfWeek: DayOfWeek
//   staff: SchoolStaff
//   subject: Subject
//   startTime: string | LocalTime
//   endTime: string | LocalTime
//   time: () => string
// }


export interface TimeTableRow {
  // startTime: string | LocalTime
  // endTime: string | LocalTime
  time: string
  monday:{staff:SchoolStaff , subject:Subject}
  tueday:{staff:SchoolStaff , subject:Subject}
  wednesday:{staff:SchoolStaff , subject:Subject}
  thursday:{staff:SchoolStaff , subject:Subject}
  friday:{staff:SchoolStaff , subject:Subject}
}
