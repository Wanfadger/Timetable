



export interface AcademicTerm {id: string , term: string}
export interface School {id: string,name: string,schoolLevel: string,schoolClasses?: SchoolClass[]}
export interface SchoolClass {id: string,name: string,academicTerm?: AcademicTerm}
export interface SchoolStaff {id: string,firstName: string,lastName: string,school?: School}
export interface Subject {id: string,name: string,code: string}
export interface SchoolTimeTableLesson{
  id:string , lessonDay:string , schoolClass:SchoolClass,subject:Subject,startTime:string,
  endTime:string,schoolStaff:SchoolStaff
}

export interface SchoolTimeTable {
  id:string
  school:School
  academicTerm:AcademicTerm
  timeTableLessons:SchoolTimeTableLesson[]
}


export const AcademicTerm: AcademicTerm = { id: "termIII", term: "Term III" }

export const SampleSchool: School = {id: "school1", name: "Sample Primary School", schoolLevel: "Primary"}

export const DbStaffs: SchoolStaff[] = [
  { id: "staff1", firstName: "Galiwango", lastName: "Fahad", school: SampleSchool },
  { id: "staff2", firstName: "Yiga", lastName: "Pius", school: SampleSchool },
  { id: "staff3", firstName: "Nkoyo", lastName: "Hassan", school: SampleSchool },
  { id: "staff4", firstName: "Galiwango", lastName: "Isaac", school: SampleSchool },
  { id: "staff5", firstName: "Galiwango", lastName: "Isaac Wanfadger", school: SampleSchool },
  { id: "staff6", firstName: "Nansubuga", lastName: "Hidayah Wanfadger Kyebatenda", school: SampleSchool },
]

export const DbSubjects: Subject[] = [
  { id: "staff1", code:"SST", name: "social Studies"},
  { id: "staff2", code:"SCI", name: "science"},
  { id: "staff3", code:"MTC", name: "mathematics"},
  { id: "staff4", code:"ENG", name: "english"},
  { id: "staff5", code:"LIT I", name: "literacy I"},
  { id: "staff6", code:"LIT II", name: "literacy II"},
]


export const DbSchoolClass:SchoolClass[] = [
  {id:"class1" , name:"P.1"},
  {id:"class2" , name:"P.2"},
  {id:"class3" , name:"P.3"},
  {id:"class4" , name:"P.4"},
  {id:"class5" , name:"P.5"},
  {id:"class6" , name:"P.6"},
  {id:"class7" , name:"P.7"},
]
