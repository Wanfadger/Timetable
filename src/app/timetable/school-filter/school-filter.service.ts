import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AcademicTerm, AcademicYear, SchoolSubject, SchoolTimeTable } from '../../dto/dto';

@Injectable({
  providedIn: 'root'
})
export class SchoolFilterService {



  constructor( private _http: HttpClient) { }

   getRegions(params:HttpParams): Observable<ResponseDto<Region[]>>{
    return this._http.get<ResponseDto<Region[]>>(`${environment.BASE_URL}/regions/filter`, {params}).pipe(retry(3))
  }

  getAllAcademicYears(): Observable<ResponseDto<AcademicYear[]>>{
    return this._http.get<ResponseDto<AcademicYear[]>>(`${environment.BASE_URL}/academicYears`).pipe(retry(3))
  }

  getAcademicTerms(params:HttpParams): Observable<ResponseDto<AcademicTerm[]>>{
    // let params = new HttpParams()
    // params = params.append('academicYear',academicYear)
    // params = params.append('academicYear', '2c9180827e293d41017e2ae3d8ce00c4')
    //return this._http.get<ResponseDto<AcademicTerm[]>>(`${environment.BASE_URL}/academicTerms/filter`, {params: params}).pipe(retry(3))
    return this._http.get<ResponseDto<AcademicTerm[]>>(`${environment.BASE_URL}/academicTerms/filter`, {params: params});
  }

  getDistricts(params:HttpParams): Observable<ResponseDto<District[]>>{
    return this._http.get<ResponseDto<District[]>>(`${environment.BASE_URL}/districts/filter`, {params}).pipe(retry(3))
  }

  getSchools(params:HttpParams): Observable<ResponseDto<School[]>>{
    return this._http.get<ResponseDto<School[]>>(`${environment.BASE_URL}/schools/filter`, {params}).pipe(retry(3))
  }


  getSchoolClasses(params:HttpParams): Observable<ResponseDto<School[]>>{
    return this._http.get<ResponseDto<School[]>>(`${environment.BASE_URL}/schoolClasses/filter`, {params}).pipe(retry(3))
  }

  getAllSubjects(params:HttpParams): Observable<ResponseDto<SchoolSubject[]>>{
    return this._http.get<ResponseDto<SchoolSubject[]>>(`${environment.BASE_URL}/subjects/filter`, {params}).pipe(retry(3))
  }

  searchStaff(params:HttpParams):Observable<ResponseDto<SchoolStaffWithSchool_DistrictDto[]>>{
    return this._http.get<ResponseDto<SchoolStaffWithSchool_DistrictDto[]>>(`${environment.BASE_URL}/schoolStaffs/filter2`, {params:params}).pipe(retry(3))
  }


  uploadTimetable(schoolTimeTable:SchoolTimeTable):Observable<ResponseDto<string>>{
    return this._http.post<ResponseDto<string>>(`${environment.BASE_URL}/timetable2` , schoolTimeTable).pipe(retry(3))
  }

  updateSchoolClassTimetable(params: HttpParams , dbTimetableLesson:DbTimetableLesson[]) {
    return this._http.put<ResponseDto<DbTimetable>>(`${environment.BASE_URL}/timetable2` , dbTimetableLesson ,{params}).pipe(retry(3))
  }

  loadTimetable(params: HttpParams):Observable<ResponseDto<DbTimetable>> {
    return this._http.get<ResponseDto<DbTimetable>>(`${environment.BASE_URL}/timetable2` , {params}).pipe(retry(3))
  }

  saveUpdateClassTimetable(tt:NewDbTimetable):Observable<ResponseDto<string>> {
    return this._http.post<ResponseDto<string>>(`${environment.BASE_URL}/saveUpdateClassTimetable` , tt).pipe(retry(3))
  }

}


export class ResponseDto<T>{
  constructor(public data: T , public status:boolean , public message:string){}
}

export interface Region {
  id: string,
  name: string,
  code: string
}


export interface District {
  name: string
  code: string
  rolledOut: string
  id: string
  status: string
}


export interface School {
  id: string,
  code: string,
  name: string,
  latitude: string,
  longitude: string
  deviceNumber: string
  attendanceTracked: string
  activationStatus: string
  schoolLevel: string
  schoolOwnership: string
  schoolType: string
  schoolGenderCategory: string
  licensed: boolean
  rolloutPhase: string
  telaSchoolNumber: string
  emisNumber: string
  telaSchoolUID: string
  telaLicenseKey: string
  districtName: string;
  districtId: string;
}


export interface SchoolStaffWithSchool_DistrictDto{
  id:string
	staffCode:string
	staffType:string
  registered:boolean
  school:{id:string, name:string , district:{id:string, name:string}}
	registrationNo:string
	nationality:string
	teachingstaff:boolean
	status:string
	firstName:string
	lastName:string
	phoneNumber:string
	email:string
	dob:string
	nationalId:string
	gender:string
	nameAbbrev:string
  serviceStatus:string
}

export interface DbTimetable{
  id:string
  breakTime:string
  lunchTime:string
  lessons:DbTimetableLesson[]
}

export interface NewDbTimetable{
  school:{id:string},
  academicTerm:{id:string},
  lessons:NewDbTimetableLesson[]
}


export interface NewDbTimetableLesson{
  id:string|null,
  startTime:string, //lesson
  endTime:string, // lesson
  lessonDay:string|null,
  duration:number;
  breakStartTime:string
  breakEndTime:string
  lunchStartTime:string
  lunchEndTime:string
  classStartTime:string
  classEndTime:string
  schoolClass:DbTimetableClass|null,
  subject:DbTimetableSubject|null,
  schoolStaff:DbTimetableStaff|null
}


export interface DbTimetableLesson{
  id:string,
  startTime:string,
  endTime:string,
  lessonDay:string,
  schoolClass:DbTimetableClass,
  subject:DbTimetableSubject,
  schoolStaff:DbTimetableStaff
}

export interface DbTimetableStaff{
  id:string , firstName:string, lastName:string
}

export interface DbTimetableSubject{
  id:string ,code:string, name:string
}

export interface DbTimetableClass{
  id:string , name:string
}


export const  TEST_LESSONS = [
  {
      "id": null,
      "startTime": "08:30",
      "endTime": "09:00",
      "lessonDay": "MONDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "2c91808579827337017982829ca10008",
          "code": "SST",
          "name": "SST",
          "subjectClassification": "Primary",
          "createdDateTime": "19/05/2021 05:46:02",
          "updatedDateTime": "23/11/2022 10:04:06",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c2025b1a9d",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "926020",
          "staffType": "Teacher",
          "registered": false,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "JUSTINE",
          "lastName": "OLUPOT",
          "phoneNumber": "0787977270",
          "email": "",
          "dob": null,
          "nationalId": "CM96035103FJLF",
          "gender": "Male",
          "nameAbbrev": "OJ",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "08:30",
      "endTime": "09:00",
      "lessonDay": "TUESDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "8a0080826ac91ea1016afc3e899a5762",
          "code": "LIB",
          "name": "LIB",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:51",
          "updatedDateTime": "23/11/2022 10:24:15",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1dda51a83",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "314968",
          "staffType": "Head teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "41541589282163",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "AGNES",
          "lastName": "NAKIMERA",
          "phoneNumber": "0789557249",
          "email": "nakimeraagnesbs@gmail.com",
          "dob": null,
          "nationalId": "CF721051003RKJ",
          "gender": "Female",
          "nameAbbrev": "NA",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "08:30",
      "endTime": "09:00",
      "lessonDay": "WEDNESDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "2c91808579827337017982827c410007",
          "code": "SCI",
          "name": "SCI",
          "subjectClassification": "Primary",
          "createdDateTime": "19/05/2021 05:45:54",
          "updatedDateTime": "23/11/2022 10:04:42",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1f9ea1a97",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "890545",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "III/2012/3641",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "JOHN PAUL",
          "lastName": "BOSSA",
          "phoneNumber": "0753626220",
          "email": "bossajohnpaul@gmail.com",
          "dob": null,
          "nationalId": "CM87012102AMLK",
          "gender": "Male",
          "nameAbbrev": "BJ",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "08:30",
      "endTime": "09:00",
      "lessonDay": "THURSDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "8a0080826ac91ea1016afc3e899a5762",
          "code": "LIB",
          "name": "LIB",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:51",
          "updatedDateTime": "23/11/2022 10:24:15",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1f70f1a95",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "462273",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "31281563411826",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "JULIET",
          "lastName": "KIHUMURO",
          "phoneNumber": "0777463137",
          "email": "",
          "dob": null,
          "nationalId": "CF88105104KMRE",
          "gender": "Female",
          "nameAbbrev": "KJ",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "08:30",
      "endTime": "09:00",
      "lessonDay": "FRIDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "2c918085797e53c501797e57c5860001",
          "code": "ENG",
          "name": "ENG",
          "subjectClassification": "Primary",
          "createdDateTime": "18/05/2021 10:20:45",
          "updatedDateTime": "23/11/2022 10:03:20",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1e8ad1a8b",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "579943",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "36221563412309",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "ROSE NAMPIIMA",
          "lastName": "BATUUKA",
          "phoneNumber": "0782918380",
          "email": "rosebatuuka@gmail.com",
          "dob": null,
          "nationalId": "CF72030103HDKC",
          "gender": "Female",
          "nameAbbrev": "BR",
          "serviceStatus": "ACTIVE"
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "09:00",
      "endTime": "09:30",
      "lessonDay": "FRIDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "2c918085797e53c501797e57c5860001",
          "code": "ENG",
          "name": "ENG",
          "subjectClassification": "Primary",
          "createdDateTime": "18/05/2021 10:20:45",
          "updatedDateTime": "23/11/2022 10:03:20",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1dda51a83",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "314968",
          "staffType": "Head teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "41541589282163",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "AGNES",
          "lastName": "NAKIMERA",
          "phoneNumber": "0789557249",
          "email": "nakimeraagnesbs@gmail.com",
          "dob": null,
          "nationalId": "CF721051003RKJ",
          "gender": "Female",
          "nameAbbrev": "NA",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "09:00",
      "endTime": "09:30",
      "lessonDay": "THURSDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "2c91808670e830410170f27af9cb0900",
          "code": "FREE",
          "name": "FREE",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:32",
          "updatedDateTime": "23/04/2023 11:45:18",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c3d1701aae",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "397188",
          "staffType": "Teacher",
          "registered": false,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "PHIONAH",
          "lastName": "NAKIBUULE",
          "phoneNumber": "0708980355",
          "email": "",
          "dob": null,
          "nationalId": "",
          "gender": "Female",
          "nameAbbrev": "NP",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "09:00",
      "endTime": "09:30",
      "lessonDay": "WEDNESDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "2c918085797e53c501797e57c5860001",
          "code": "ENG",
          "name": "ENG",
          "subjectClassification": "Primary",
          "createdDateTime": "18/05/2021 10:20:45",
          "updatedDateTime": "23/11/2022 10:03:20",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1e02c1a85",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "116520",
          "staffType": "Deputy head teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "48341565156600",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "SARAH",
          "lastName": "NASSIMBWA",
          "phoneNumber": "0782584690",
          "email": "sarahnassimbwa70@gmail.com",
          "dob": null,
          "nationalId": "CF700321005JFG",
          "gender": "Female",
          "nameAbbrev": "NS",
          "serviceStatus": "ACTIVE"
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "09:00",
      "endTime": "09:30",
      "lessonDay": "TUESDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "2c91808579827337017982827c410007",
          "code": "SCI",
          "name": "SCI",
          "subjectClassification": "Primary",
          "createdDateTime": "19/05/2021 05:45:54",
          "updatedDateTime": "23/11/2022 10:04:42",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1f1c31a91",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "319518",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "55081589443447",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "FREDRICK",
          "lastName": "LULE",
          "phoneNumber": "0777178992",
          "email": "lulefredrick1988@gmail.com",
          "dob": null,
          "nationalId": "CM88068100F48F",
          "gender": "Male",
          "nameAbbrev": "LF",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "09:00",
      "endTime": "09:30",
      "lessonDay": "MONDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "2c91808670e830410170f27af9cb0900",
          "code": "FREE",
          "name": "FREE",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:32",
          "updatedDateTime": "23/04/2023 11:45:18",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1f1c31a91",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "319518",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "55081589443447",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "FREDRICK",
          "lastName": "LULE",
          "phoneNumber": "0777178992",
          "email": "lulefredrick1988@gmail.com",
          "dob": null,
          "nationalId": "CM88068100F48F",
          "gender": "Male",
          "nameAbbrev": "LF",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "09:30",
      "endTime": "10:00",
      "lessonDay": "MONDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "ff808081643ff54601643ff789c20004",
          "code": "SST",
          "name": "SST",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:51",
          "updatedDateTime": "23/11/2022 10:22:07",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1e2dc1a87",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "597493",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "37161552979683",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "HANNINGTON MUKASA",
          "lastName": "KOMBE",
          "phoneNumber": "0782483746",
          "email": "kombemukasa@gmail.com",
          "dob": null,
          "nationalId": "CM75052103NTRD",
          "gender": "Male",
          "nameAbbrev": "KH",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "09:30",
      "endTime": "10:00",
      "lessonDay": "TUESDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "2c918085797e53c501797e57c5860001",
          "code": "ENG",
          "name": "ENG",
          "subjectClassification": "Primary",
          "createdDateTime": "18/05/2021 10:20:45",
          "updatedDateTime": "23/11/2022 10:03:20",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1f1c31a91",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "319518",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "55081589443447",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "FREDRICK",
          "lastName": "LULE",
          "phoneNumber": "0777178992",
          "email": "lulefredrick1988@gmail.com",
          "dob": null,
          "nationalId": "CM88068100F48F",
          "gender": "Male",
          "nameAbbrev": "LF",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "09:30",
      "endTime": "10:00",
      "lessonDay": "WEDNESDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "2c91808579827337017982827c410007",
          "code": "SCI",
          "name": "SCI",
          "subjectClassification": "Primary",
          "createdDateTime": "19/05/2021 05:45:54",
          "updatedDateTime": "23/11/2022 10:04:42",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1f49d1a93",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "314840",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "56391584871258",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "JOWERIA",
          "lastName": "NASSOZI",
          "phoneNumber": "0780759200",
          "email": "nassozijoweria2019@gmail.com",
          "dob": null,
          "nationalId": "CF9705210R3LYH",
          "gender": "Female",
          "nameAbbrev": "NJ",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "09:30",
      "endTime": "10:00",
      "lessonDay": "THURSDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "8a0080826ac91ea1016afc3e899a5762",
          "code": "LIB",
          "name": "LIB",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:51",
          "updatedDateTime": "23/11/2022 10:24:15",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1f49d1a93",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "314840",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "56391584871258",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "JOWERIA",
          "lastName": "NASSOZI",
          "phoneNumber": "0780759200",
          "email": "nassozijoweria2019@gmail.com",
          "dob": null,
          "nationalId": "CF9705210R3LYH",
          "gender": "Female",
          "nameAbbrev": "NJ",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "09:30",
      "endTime": "10:00",
      "lessonDay": "FRIDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "ff808081643ff54601643ff789c20004",
          "code": "SST",
          "name": "SST",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:51",
          "updatedDateTime": "23/11/2022 10:22:07",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1f49d1a93",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "314840",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "56391584871258",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "JOWERIA",
          "lastName": "NASSOZI",
          "phoneNumber": "0780759200",
          "email": "nassozijoweria2019@gmail.com",
          "dob": null,
          "nationalId": "CF9705210R3LYH",
          "gender": "Female",
          "nameAbbrev": "NJ",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "10:00",
      "endTime": "10:30",
      "lessonDay": "MONDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "8a0080826ac91ea1016afc3e8a0d5766",
          "code": "CAPE 1",
          "name": "CAPE 1",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:51",
          "updatedDateTime": "21/04/2023 03:44:32",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1dda51a83",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "314968",
          "staffType": "Head teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "41541589282163",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "AGNES",
          "lastName": "NAKIMERA",
          "phoneNumber": "0789557249",
          "email": "nakimeraagnesbs@gmail.com",
          "dob": null,
          "nationalId": "CF721051003RKJ",
          "gender": "Female",
          "nameAbbrev": "NA",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "10:00",
      "endTime": "10:30",
      "lessonDay": "TUESDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "2c918085797e53c501797e57c5860001",
          "code": "ENG",
          "name": "ENG",
          "subjectClassification": "Primary",
          "createdDateTime": "18/05/2021 10:20:45",
          "updatedDateTime": "23/11/2022 10:03:20",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1ec001a8d",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "611954",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "13201563412079",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "ELKANAH",
          "lastName": "OLUKA",
          "phoneNumber": "0773004068",
          "email": "olukaelkanah@gmail.com",
          "dob": null,
          "nationalId": "CM780351025X1E",
          "gender": "Male",
          "nameAbbrev": "OE",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "10:00",
      "endTime": "10:30",
      "lessonDay": "WEDNESDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "ff808081643ff54601643ff789c20004",
          "code": "SST",
          "name": "SST",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:51",
          "updatedDateTime": "23/11/2022 10:22:07",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1e02c1a85",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "116520",
          "staffType": "Deputy head teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "48341565156600",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "SARAH",
          "lastName": "NASSIMBWA",
          "phoneNumber": "0782584690",
          "email": "sarahnassimbwa70@gmail.com",
          "dob": null,
          "nationalId": "CF700321005JFG",
          "gender": "Female",
          "nameAbbrev": "NS",
          "serviceStatus": "ACTIVE"
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "10:00",
      "endTime": "10:30",
      "lessonDay": "THURSDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "ff808081643ff54601643ff789c20004",
          "code": "SST",
          "name": "SST",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:51",
          "updatedDateTime": "23/11/2022 10:22:07",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1e02c1a85",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "116520",
          "staffType": "Deputy head teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "48341565156600",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "SARAH",
          "lastName": "NASSIMBWA",
          "phoneNumber": "0782584690",
          "email": "sarahnassimbwa70@gmail.com",
          "dob": null,
          "nationalId": "CF700321005JFG",
          "gender": "Female",
          "nameAbbrev": "NS",
          "serviceStatus": "ACTIVE"
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "10:00",
      "endTime": "10:30",
      "lessonDay": "FRIDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "8a0080826ac91ea1016b0d1c4fd96a65",
          "code": "LL",
          "name": "LL",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:51",
          "updatedDateTime": "21/04/2023 03:42:44",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1f1c31a91",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "319518",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "55081589443447",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "FREDRICK",
          "lastName": "LULE",
          "phoneNumber": "0777178992",
          "email": "lulefredrick1988@gmail.com",
          "dob": null,
          "nationalId": "CM88068100F48F",
          "gender": "Male",
          "nameAbbrev": "LF",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "11:00",
      "endTime": "11:30",
      "lessonDay": "FRIDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "8a0080826ac91ea1016afc3e899a5762",
          "code": "LIB",
          "name": "LIB",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:51",
          "updatedDateTime": "23/11/2022 10:24:15",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1e8ad1a8b",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "579943",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "36221563412309",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "ROSE NAMPIIMA",
          "lastName": "BATUUKA",
          "phoneNumber": "0782918380",
          "email": "rosebatuuka@gmail.com",
          "dob": null,
          "nationalId": "CF72030103HDKC",
          "gender": "Female",
          "nameAbbrev": "BR",
          "serviceStatus": "ACTIVE"
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "11:00",
      "endTime": "11:30",
      "lessonDay": "THURSDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "8a0080826ac91ea1016afc3e8a0d5766",
          "code": "CAPE 1",
          "name": "CAPE 1",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:51",
          "updatedDateTime": "21/04/2023 03:44:32",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1ec001a8d",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "611954",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "13201563412079",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "ELKANAH",
          "lastName": "OLUKA",
          "phoneNumber": "0773004068",
          "email": "olukaelkanah@gmail.com",
          "dob": null,
          "nationalId": "CM780351025X1E",
          "gender": "Male",
          "nameAbbrev": "OE",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "11:00",
      "endTime": "11:30",
      "lessonDay": "WEDNESDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "ff808081643ff54601643ff789c20004",
          "code": "SST",
          "name": "SST",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:51",
          "updatedDateTime": "23/11/2022 10:22:07",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1e02c1a85",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "116520",
          "staffType": "Deputy head teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "48341565156600",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "SARAH",
          "lastName": "NASSIMBWA",
          "phoneNumber": "0782584690",
          "email": "sarahnassimbwa70@gmail.com",
          "dob": null,
          "nationalId": "CF700321005JFG",
          "gender": "Female",
          "nameAbbrev": "NS",
          "serviceStatus": "ACTIVE"
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "11:00",
      "endTime": "11:30",
      "lessonDay": "TUESDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "2c918085797e53c501797e57c5860001",
          "code": "ENG",
          "name": "ENG",
          "subjectClassification": "Primary",
          "createdDateTime": "18/05/2021 10:20:45",
          "updatedDateTime": "23/11/2022 10:03:20",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1ec001a8d",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "611954",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "13201563412079",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "ELKANAH",
          "lastName": "OLUKA",
          "phoneNumber": "0773004068",
          "email": "olukaelkanah@gmail.com",
          "dob": null,
          "nationalId": "CM780351025X1E",
          "gender": "Male",
          "nameAbbrev": "OE",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "11:00",
      "endTime": "11:30",
      "lessonDay": "MONDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "8a0080826ac91ea1016afc3e8a0d5766",
          "code": "CAPE 1",
          "name": "CAPE 1",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:51",
          "updatedDateTime": "21/04/2023 03:44:32",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1e8ad1a8b",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "579943",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "36221563412309",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "ROSE NAMPIIMA",
          "lastName": "BATUUKA",
          "phoneNumber": "0782918380",
          "email": "rosebatuuka@gmail.com",
          "dob": null,
          "nationalId": "CF72030103HDKC",
          "gender": "Female",
          "nameAbbrev": "BR",
          "serviceStatus": "ACTIVE"
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "11:30",
      "endTime": "12:00",
      "lessonDay": "THURSDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "2c92808684cbbcc10184e15be328186d",
          "code": "GEO",
          "name": "GEO",
          "subjectClassification": "Secondary",
          "createdDateTime": "05/12/2022 11:16:46",
          "updatedDateTime": "05/12/2022 11:16:46",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1e02c1a85",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "116520",
          "staffType": "Deputy head teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "48341565156600",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "SARAH",
          "lastName": "NASSIMBWA",
          "phoneNumber": "0782584690",
          "email": "sarahnassimbwa70@gmail.com",
          "dob": null,
          "nationalId": "CF700321005JFG",
          "gender": "Female",
          "nameAbbrev": "NS",
          "serviceStatus": "ACTIVE"
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "11:30",
      "endTime": "12:00",
      "lessonDay": "FRIDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "8a0080826ac91ea1016afc3e899a5762",
          "code": "LIB",
          "name": "LIB",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:51",
          "updatedDateTime": "23/11/2022 10:24:15",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1e2dc1a87",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "597493",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "37161552979683",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "HANNINGTON MUKASA",
          "lastName": "KOMBE",
          "phoneNumber": "0782483746",
          "email": "kombemukasa@gmail.com",
          "dob": null,
          "nationalId": "CM75052103NTRD",
          "gender": "Male",
          "nameAbbrev": "KH",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "11:30",
      "endTime": "12:00",
      "lessonDay": "WEDNESDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "2c91808670e830410170f27af9cb0900",
          "code": "FREE",
          "name": "FREE",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:32",
          "updatedDateTime": "23/04/2023 11:45:18",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c9a808588560949018865f198f033fd",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "733423",
          "staffType": "Teacher",
          "registered": false,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": null,
          "nationality": null,
          "teachingstaff": false,
          "firstName": "ROGERS",
          "lastName": "MUGABI",
          "phoneNumber": "0753651127",
          "email": "",
          "dob": null,
          "nationalId": "CM761011003A8J",
          "gender": "Male",
          "nameAbbrev": "MR",
          "serviceStatus": "ACTIVE"
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "11:30",
      "endTime": "12:00",
      "lessonDay": "TUESDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "8a0080826ac91ea1016afc3e899a5762",
          "code": "LIB",
          "name": "LIB",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:51",
          "updatedDateTime": "23/11/2022 10:24:15",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1f9ea1a97",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "890545",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "III/2012/3641",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "JOHN PAUL",
          "lastName": "BOSSA",
          "phoneNumber": "0753626220",
          "email": "bossajohnpaul@gmail.com",
          "dob": null,
          "nationalId": "CM87012102AMLK",
          "gender": "Male",
          "nameAbbrev": "BJ",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "11:30",
      "endTime": "12:00",
      "lessonDay": "MONDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "2c91808670e830410170f27af9a108fe",
          "code": "DEBATE",
          "name": "DEBATE",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:32",
          "updatedDateTime": "21/04/2023 04:16:24",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1f49d1a93",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "314840",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "56391584871258",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "JOWERIA",
          "lastName": "NASSOZI",
          "phoneNumber": "0780759200",
          "email": "nassozijoweria2019@gmail.com",
          "dob": null,
          "nationalId": "CF9705210R3LYH",
          "gender": "Female",
          "nameAbbrev": "NJ",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "12:00",
      "endTime": "12:30",
      "lessonDay": "FRIDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "8a0080826ac91ea1016afc3e899a5762",
          "code": "LIB",
          "name": "LIB",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:51",
          "updatedDateTime": "23/11/2022 10:24:15",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1e5b81a89",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "511149",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "37711560628155",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "TONNY OGAYA",
          "lastName": "OKELLO",
          "phoneNumber": "0775126613",
          "email": "tonnyogaya@gmail.com",
          "dob": null,
          "nationalId": "CM87088100AENL",
          "gender": "Male",
          "nameAbbrev": "OT",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "12:00",
      "endTime": "12:30",
      "lessonDay": "THURSDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "8a0080826ac91ea1016b0d1c4fd96a65",
          "code": "LL",
          "name": "LL",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:51",
          "updatedDateTime": "21/04/2023 03:42:44",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1f1c31a91",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "319518",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "55081589443447",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "FREDRICK",
          "lastName": "LULE",
          "phoneNumber": "0777178992",
          "email": "lulefredrick1988@gmail.com",
          "dob": null,
          "nationalId": "CM88068100F48F",
          "gender": "Male",
          "nameAbbrev": "LF",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "12:00",
      "endTime": "12:30",
      "lessonDay": "WEDNESDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "8a0080826ac91ea1016afc3e899a5762",
          "code": "LIB",
          "name": "LIB",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:51",
          "updatedDateTime": "23/11/2022 10:24:15",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1e5b81a89",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "511149",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "37711560628155",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "TONNY OGAYA",
          "lastName": "OKELLO",
          "phoneNumber": "0775126613",
          "email": "tonnyogaya@gmail.com",
          "dob": null,
          "nationalId": "CM87088100AENL",
          "gender": "Male",
          "nameAbbrev": "OT",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "12:00",
      "endTime": "12:30",
      "lessonDay": "TUESDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "2c92808684cbbcc10184e15b2fd41852",
          "code": "BIO",
          "name": "BIO",
          "subjectClassification": "Secondary",
          "createdDateTime": "05/12/2022 11:16:00",
          "updatedDateTime": "05/12/2022 11:16:00",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1ec001a8d",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "611954",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "13201563412079",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "ELKANAH",
          "lastName": "OLUKA",
          "phoneNumber": "0773004068",
          "email": "olukaelkanah@gmail.com",
          "dob": null,
          "nationalId": "CM780351025X1E",
          "gender": "Male",
          "nameAbbrev": "OE",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "12:00",
      "endTime": "12:30",
      "lessonDay": "MONDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "2c91808579827337017982827c410007",
          "code": "SCI",
          "name": "SCI",
          "subjectClassification": "Primary",
          "createdDateTime": "19/05/2021 05:45:54",
          "updatedDateTime": "23/11/2022 10:04:42",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1f9ea1a97",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "890545",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "III/2012/3641",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "JOHN PAUL",
          "lastName": "BOSSA",
          "phoneNumber": "0753626220",
          "email": "bossajohnpaul@gmail.com",
          "dob": null,
          "nationalId": "CM87012102AMLK",
          "gender": "Male",
          "nameAbbrev": "BJ",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "12:30",
      "endTime": "13:00",
      "lessonDay": "THURSDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "2c91808670e830410170f27af9cb0900",
          "code": "FREE",
          "name": "FREE",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:32",
          "updatedDateTime": "23/04/2023 11:45:18",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1f49d1a93",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "314840",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "56391584871258",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "JOWERIA",
          "lastName": "NASSOZI",
          "phoneNumber": "0780759200",
          "email": "nassozijoweria2019@gmail.com",
          "dob": null,
          "nationalId": "CF9705210R3LYH",
          "gender": "Female",
          "nameAbbrev": "NJ",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "12:30",
      "endTime": "13:00",
      "lessonDay": "FRIDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "2c91808579827337017982827c410007",
          "code": "SCI",
          "name": "SCI",
          "subjectClassification": "Primary",
          "createdDateTime": "19/05/2021 05:45:54",
          "updatedDateTime": "23/11/2022 10:04:42",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1e5b81a89",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "511149",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "37711560628155",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "TONNY OGAYA",
          "lastName": "OKELLO",
          "phoneNumber": "0775126613",
          "email": "tonnyogaya@gmail.com",
          "dob": null,
          "nationalId": "CM87088100AENL",
          "gender": "Male",
          "nameAbbrev": "OT",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "12:30",
      "endTime": "13:00",
      "lessonDay": "WEDNESDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "8a0080826da55015016dc92bb01153fe",
          "code": "MTC",
          "name": "MTC",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:51",
          "updatedDateTime": "23/11/2022 10:21:43",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1f70f1a95",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "462273",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "31281563411826",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "JULIET",
          "lastName": "KIHUMURO",
          "phoneNumber": "0777463137",
          "email": "",
          "dob": null,
          "nationalId": "CF88105104KMRE",
          "gender": "Female",
          "nameAbbrev": "KJ",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "12:30",
      "endTime": "13:00",
      "lessonDay": "TUESDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "8a0080826ac91ea1016afc3e899a5762",
          "code": "LIB",
          "name": "LIB",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:51",
          "updatedDateTime": "23/11/2022 10:24:15",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1e8ad1a8b",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "579943",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "36221563412309",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "ROSE NAMPIIMA",
          "lastName": "BATUUKA",
          "phoneNumber": "0782918380",
          "email": "rosebatuuka@gmail.com",
          "dob": null,
          "nationalId": "CF72030103HDKC",
          "gender": "Female",
          "nameAbbrev": "BR",
          "serviceStatus": "ACTIVE"
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "12:30",
      "endTime": "13:00",
      "lessonDay": "MONDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "2c91808670e830410170f27af9a108fe",
          "code": "DEBATE",
          "name": "DEBATE",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:32",
          "updatedDateTime": "21/04/2023 04:16:24",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1ec001a8d",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "611954",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "13201563412079",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "ELKANAH",
          "lastName": "OLUKA",
          "phoneNumber": "0773004068",
          "email": "olukaelkanah@gmail.com",
          "dob": null,
          "nationalId": "CM780351025X1E",
          "gender": "Male",
          "nameAbbrev": "OE",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "13:30",
      "endTime": "14:00",
      "lessonDay": "MONDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "2c92808684cbbcc10184e15f158318c6",
          "code": "LIT 1",
          "name": "LIT 1",
          "subjectClassification": "Secondary",
          "createdDateTime": "05/12/2022 11:20:15",
          "updatedDateTime": "05/12/2022 11:20:15",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1f49d1a93",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "314840",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "56391584871258",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "JOWERIA",
          "lastName": "NASSOZI",
          "phoneNumber": "0780759200",
          "email": "nassozijoweria2019@gmail.com",
          "dob": null,
          "nationalId": "CF9705210R3LYH",
          "gender": "Female",
          "nameAbbrev": "NJ",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "13:30",
      "endTime": "14:00",
      "lessonDay": "TUESDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "8a0080826ac91ea1016afc3e8a0d5766",
          "code": "CAPE 1",
          "name": "CAPE 1",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:51",
          "updatedDateTime": "21/04/2023 03:44:32",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1f9ea1a97",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "890545",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "III/2012/3641",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "JOHN PAUL",
          "lastName": "BOSSA",
          "phoneNumber": "0753626220",
          "email": "bossajohnpaul@gmail.com",
          "dob": null,
          "nationalId": "CM87012102AMLK",
          "gender": "Male",
          "nameAbbrev": "BJ",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "13:30",
      "endTime": "14:00",
      "lessonDay": "WEDNESDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "8a0080826da55015016dc92bb01153fe",
          "code": "MTC",
          "name": "MTC",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:51",
          "updatedDateTime": "23/11/2022 10:21:43",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1f49d1a93",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "314840",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "56391584871258",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "JOWERIA",
          "lastName": "NASSOZI",
          "phoneNumber": "0780759200",
          "email": "nassozijoweria2019@gmail.com",
          "dob": null,
          "nationalId": "CF9705210R3LYH",
          "gender": "Female",
          "nameAbbrev": "NJ",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "13:30",
      "endTime": "14:00",
      "lessonDay": "THURSDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "ff808081643ff54601643ff789c20004",
          "code": "SST",
          "name": "SST",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:51",
          "updatedDateTime": "23/11/2022 10:22:07",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1f49d1a93",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "314840",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "56391584871258",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "JOWERIA",
          "lastName": "NASSOZI",
          "phoneNumber": "0780759200",
          "email": "nassozijoweria2019@gmail.com",
          "dob": null,
          "nationalId": "CF9705210R3LYH",
          "gender": "Female",
          "nameAbbrev": "NJ",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "13:30",
      "endTime": "14:00",
      "lessonDay": "FRIDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "ff808081643ff54601643ff789c20004",
          "code": "SST",
          "name": "SST",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:51",
          "updatedDateTime": "23/11/2022 10:22:07",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1e02c1a85",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "116520",
          "staffType": "Deputy head teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "48341565156600",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "SARAH",
          "lastName": "NASSIMBWA",
          "phoneNumber": "0782584690",
          "email": "sarahnassimbwa70@gmail.com",
          "dob": null,
          "nationalId": "CF700321005JFG",
          "gender": "Female",
          "nameAbbrev": "NS",
          "serviceStatus": "ACTIVE"
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "14:00",
      "endTime": "14:30",
      "lessonDay": "FRIDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "2c92808684cbbcc10184e15c4013187b",
          "code": "CRE",
          "name": "CRE",
          "subjectClassification": "Secondary",
          "createdDateTime": "05/12/2022 11:17:10",
          "updatedDateTime": "05/12/2022 11:17:10",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1f49d1a93",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "314840",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "56391584871258",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "JOWERIA",
          "lastName": "NASSOZI",
          "phoneNumber": "0780759200",
          "email": "nassozijoweria2019@gmail.com",
          "dob": null,
          "nationalId": "CF9705210R3LYH",
          "gender": "Female",
          "nameAbbrev": "NJ",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "14:00",
      "endTime": "14:30",
      "lessonDay": "THURSDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "2c91808579827337017982827c410007",
          "code": "SCI",
          "name": "SCI",
          "subjectClassification": "Primary",
          "createdDateTime": "19/05/2021 05:45:54",
          "updatedDateTime": "23/11/2022 10:04:42",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1dda51a83",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "314968",
          "staffType": "Head teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "41541589282163",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "AGNES",
          "lastName": "NAKIMERA",
          "phoneNumber": "0789557249",
          "email": "nakimeraagnesbs@gmail.com",
          "dob": null,
          "nationalId": "CF721051003RKJ",
          "gender": "Female",
          "nameAbbrev": "NA",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "14:00",
      "endTime": "14:30",
      "lessonDay": "WEDNESDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "2c91808579827337017982827c410007",
          "code": "SCI",
          "name": "SCI",
          "subjectClassification": "Primary",
          "createdDateTime": "19/05/2021 05:45:54",
          "updatedDateTime": "23/11/2022 10:04:42",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1e02c1a85",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "116520",
          "staffType": "Deputy head teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "48341565156600",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "SARAH",
          "lastName": "NASSIMBWA",
          "phoneNumber": "0782584690",
          "email": "sarahnassimbwa70@gmail.com",
          "dob": null,
          "nationalId": "CF700321005JFG",
          "gender": "Female",
          "nameAbbrev": "NS",
          "serviceStatus": "ACTIVE"
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "14:00",
      "endTime": "14:30",
      "lessonDay": "TUESDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "8a0080826ac91ea1016b0d1c4fd96a65",
          "code": "LL",
          "name": "LL",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:51",
          "updatedDateTime": "21/04/2023 03:42:44",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1f9ea1a97",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "890545",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "III/2012/3641",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "JOHN PAUL",
          "lastName": "BOSSA",
          "phoneNumber": "0753626220",
          "email": "bossajohnpaul@gmail.com",
          "dob": null,
          "nationalId": "CM87012102AMLK",
          "gender": "Male",
          "nameAbbrev": "BJ",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "14:00",
      "endTime": "14:30",
      "lessonDay": "MONDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "2c918085797e53c501797e57c5860001",
          "code": "ENG",
          "name": "ENG",
          "subjectClassification": "Primary",
          "createdDateTime": "18/05/2021 10:20:45",
          "updatedDateTime": "23/11/2022 10:03:20",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1e02c1a85",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "116520",
          "staffType": "Deputy head teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "48341565156600",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "SARAH",
          "lastName": "NASSIMBWA",
          "phoneNumber": "0782584690",
          "email": "sarahnassimbwa70@gmail.com",
          "dob": null,
          "nationalId": "CF700321005JFG",
          "gender": "Female",
          "nameAbbrev": "NS",
          "serviceStatus": "ACTIVE"
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "14:30",
      "endTime": "15:00",
      "lessonDay": "FRIDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "ff808081643ff54601643ff789c20004",
          "code": "SST",
          "name": "SST",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:51",
          "updatedDateTime": "23/11/2022 10:22:07",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c9a808588560949018865f198f033fd",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "733423",
          "staffType": "Teacher",
          "registered": false,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": null,
          "nationality": null,
          "teachingstaff": false,
          "firstName": "ROGERS",
          "lastName": "MUGABI",
          "phoneNumber": "0753651127",
          "email": "",
          "dob": null,
          "nationalId": "CM761011003A8J",
          "gender": "Male",
          "nameAbbrev": "MR",
          "serviceStatus": "ACTIVE"
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "14:30",
      "endTime": "15:00",
      "lessonDay": "THURSDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "2c91808670e830410170f27af9cb0900",
          "code": "FREE",
          "name": "FREE",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:32",
          "updatedDateTime": "23/04/2023 11:45:18",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1dda51a83",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "314968",
          "staffType": "Head teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "41541589282163",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "AGNES",
          "lastName": "NAKIMERA",
          "phoneNumber": "0789557249",
          "email": "nakimeraagnesbs@gmail.com",
          "dob": null,
          "nationalId": "CF721051003RKJ",
          "gender": "Female",
          "nameAbbrev": "NA",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "14:30",
      "endTime": "15:00",
      "lessonDay": "WEDNESDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "2c91808670e830410170f27af9cb0900",
          "code": "FREE",
          "name": "FREE",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:32",
          "updatedDateTime": "23/04/2023 11:45:18",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c9a8085885609490188660dd9b271b9",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "274309",
          "staffType": "Teacher",
          "registered": false,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": null,
          "nationality": null,
          "teachingstaff": false,
          "firstName": "GRACE",
          "lastName": "NAWAHO",
          "phoneNumber": "0702838744",
          "email": "",
          "dob": null,
          "nationalId": "CF77060105862E",
          "gender": "Female",
          "nameAbbrev": "NG",
          "serviceStatus": "ACTIVE"
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "14:30",
      "endTime": "15:00",
      "lessonDay": "TUESDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "8a0080826da55015016dc92bb01153fe",
          "code": "MTC",
          "name": "MTC",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:51",
          "updatedDateTime": "23/11/2022 10:21:43",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1f9ea1a97",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "890545",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "III/2012/3641",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "JOHN PAUL",
          "lastName": "BOSSA",
          "phoneNumber": "0753626220",
          "email": "bossajohnpaul@gmail.com",
          "dob": null,
          "nationalId": "CM87012102AMLK",
          "gender": "Male",
          "nameAbbrev": "BJ",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "14:30",
      "endTime": "15:00",
      "lessonDay": "MONDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "2c918085797e53c501797e57c5860001",
          "code": "ENG",
          "name": "ENG",
          "subjectClassification": "Primary",
          "createdDateTime": "18/05/2021 10:20:45",
          "updatedDateTime": "23/11/2022 10:03:20",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c9a8085885609490188660dd9b271b9",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "274309",
          "staffType": "Teacher",
          "registered": false,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": null,
          "nationality": null,
          "teachingstaff": false,
          "firstName": "GRACE",
          "lastName": "NAWAHO",
          "phoneNumber": "0702838744",
          "email": "",
          "dob": null,
          "nationalId": "CF77060105862E",
          "gender": "Female",
          "nameAbbrev": "NG",
          "serviceStatus": "ACTIVE"
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "15:00",
      "endTime": "15:30",
      "lessonDay": "FRIDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "8a0080826ac91ea1016b0d1c4fd96a65",
          "code": "LL",
          "name": "LL",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:51",
          "updatedDateTime": "21/04/2023 03:42:44",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1f49d1a93",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "314840",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "56391584871258",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "JOWERIA",
          "lastName": "NASSOZI",
          "phoneNumber": "0780759200",
          "email": "nassozijoweria2019@gmail.com",
          "dob": null,
          "nationalId": "CF9705210R3LYH",
          "gender": "Female",
          "nameAbbrev": "NJ",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "15:00",
      "endTime": "15:30",
      "lessonDay": "THURSDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "8a0080826ac91ea1016b0d1c4fd96a65",
          "code": "LL",
          "name": "LL",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:51",
          "updatedDateTime": "21/04/2023 03:42:44",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1e5b81a89",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "511149",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "37711560628155",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "TONNY OGAYA",
          "lastName": "OKELLO",
          "phoneNumber": "0775126613",
          "email": "tonnyogaya@gmail.com",
          "dob": null,
          "nationalId": "CM87088100AENL",
          "gender": "Male",
          "nameAbbrev": "OT",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "15:00",
      "endTime": "15:30",
      "lessonDay": "WEDNESDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "2c91808579827337017982827c410007",
          "code": "SCI",
          "name": "SCI",
          "subjectClassification": "Primary",
          "createdDateTime": "19/05/2021 05:45:54",
          "updatedDateTime": "23/11/2022 10:04:42",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1f1c31a91",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "319518",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "55081589443447",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "FREDRICK",
          "lastName": "LULE",
          "phoneNumber": "0777178992",
          "email": "lulefredrick1988@gmail.com",
          "dob": null,
          "nationalId": "CM88068100F48F",
          "gender": "Male",
          "nameAbbrev": "LF",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "15:00",
      "endTime": "15:30",
      "lessonDay": "TUESDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "8a0080826ac91ea1016b0d1c4fd96a65",
          "code": "LL",
          "name": "LL",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:51",
          "updatedDateTime": "21/04/2023 03:42:44",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1f49d1a93",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "314840",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "56391584871258",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "JOWERIA",
          "lastName": "NASSOZI",
          "phoneNumber": "0780759200",
          "email": "nassozijoweria2019@gmail.com",
          "dob": null,
          "nationalId": "CF9705210R3LYH",
          "gender": "Female",
          "nameAbbrev": "NJ",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "15:00",
      "endTime": "15:30",
      "lessonDay": "MONDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "2c91808579827337017982827c410007",
          "code": "SCI",
          "name": "SCI",
          "subjectClassification": "Primary",
          "createdDateTime": "19/05/2021 05:45:54",
          "updatedDateTime": "23/11/2022 10:04:42",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1e8ad1a8b",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "579943",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "36221563412309",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "ROSE NAMPIIMA",
          "lastName": "BATUUKA",
          "phoneNumber": "0782918380",
          "email": "rosebatuuka@gmail.com",
          "dob": null,
          "nationalId": "CF72030103HDKC",
          "gender": "Female",
          "nameAbbrev": "BR",
          "serviceStatus": "ACTIVE"
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "15:30",
      "endTime": "16:00",
      "lessonDay": "THURSDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "2c92808684cbbcc10184e15f158318c6",
          "code": "LIT 1",
          "name": "LIT 1",
          "subjectClassification": "Secondary",
          "createdDateTime": "05/12/2022 11:20:15",
          "updatedDateTime": "05/12/2022 11:20:15",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1ec001a8d",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "611954",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "13201563412079",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "ELKANAH",
          "lastName": "OLUKA",
          "phoneNumber": "0773004068",
          "email": "olukaelkanah@gmail.com",
          "dob": null,
          "nationalId": "CM780351025X1E",
          "gender": "Male",
          "nameAbbrev": "OE",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "15:30",
      "endTime": "16:00",
      "lessonDay": "FRIDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "8a0080826da55015016dc92bb01153fe",
          "code": "MTC",
          "name": "MTC",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:51",
          "updatedDateTime": "23/11/2022 10:21:43",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1ec001a8d",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "611954",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "13201563412079",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "ELKANAH",
          "lastName": "OLUKA",
          "phoneNumber": "0773004068",
          "email": "olukaelkanah@gmail.com",
          "dob": null,
          "nationalId": "CM780351025X1E",
          "gender": "Male",
          "nameAbbrev": "OE",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "15:30",
      "endTime": "16:00",
      "lessonDay": "WEDNESDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "8a0080826ac91ea1016afc3e899a5762",
          "code": "LIB",
          "name": "LIB",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:51",
          "updatedDateTime": "23/11/2022 10:24:15",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c3d1811ab0",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "455791",
          "staffType": "Others",
          "registered": false,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "BENSON",
          "lastName": "KWIZERA",
          "phoneNumber": "0785092442",
          "email": "",
          "dob": null,
          "nationalId": "",
          "gender": "Male",
          "nameAbbrev": "KB",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "15:30",
      "endTime": "16:00",
      "lessonDay": "TUESDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "8a0080826ac91ea1016b0d1c4fd96a65",
          "code": "LL",
          "name": "LL",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:51",
          "updatedDateTime": "21/04/2023 03:42:44",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1e8ad1a8b",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "579943",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "36221563412309",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "ROSE NAMPIIMA",
          "lastName": "BATUUKA",
          "phoneNumber": "0782918380",
          "email": "rosebatuuka@gmail.com",
          "dob": null,
          "nationalId": "CF72030103HDKC",
          "gender": "Female",
          "nameAbbrev": "BR",
          "serviceStatus": "ACTIVE"
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "15:30",
      "endTime": "16:00",
      "lessonDay": "MONDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "8a0080826ac91ea1016b0d1c4fd96a65",
          "code": "LL",
          "name": "LL",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:51",
          "updatedDateTime": "21/04/2023 03:42:44",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1e8ad1a8b",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "579943",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "36221563412309",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "ROSE NAMPIIMA",
          "lastName": "BATUUKA",
          "phoneNumber": "0782918380",
          "email": "rosebatuuka@gmail.com",
          "dob": null,
          "nationalId": "CF72030103HDKC",
          "gender": "Female",
          "nameAbbrev": "BR",
          "serviceStatus": "ACTIVE"
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "16:00",
      "endTime": "16:30",
      "lessonDay": "TUESDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "2c91808670e830410170f27af9cb0900",
          "code": "FREE",
          "name": "FREE",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:32",
          "updatedDateTime": "23/04/2023 11:45:18",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1dda51a83",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "314968",
          "staffType": "Head teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "41541589282163",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "AGNES",
          "lastName": "NAKIMERA",
          "phoneNumber": "0789557249",
          "email": "nakimeraagnesbs@gmail.com",
          "dob": null,
          "nationalId": "CF721051003RKJ",
          "gender": "Female",
          "nameAbbrev": "NA",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "16:00",
      "endTime": "16:30",
      "lessonDay": "MONDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "8a0080826ac91ea1016afc3e899a5762",
          "code": "LIB",
          "name": "LIB",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:51",
          "updatedDateTime": "23/11/2022 10:24:15",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1e5b81a89",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "511149",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "37711560628155",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "TONNY OGAYA",
          "lastName": "OKELLO",
          "phoneNumber": "0775126613",
          "email": "tonnyogaya@gmail.com",
          "dob": null,
          "nationalId": "CM87088100AENL",
          "gender": "Male",
          "nameAbbrev": "OT",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "16:00",
      "endTime": "16:30",
      "lessonDay": "WEDNESDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "8a0080826ac91ea1016afc3e899a5762",
          "code": "LIB",
          "name": "LIB",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:51",
          "updatedDateTime": "23/11/2022 10:24:15",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1ffbb1a9b",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "758629",
          "staffType": "Teacher",
          "registered": false,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "CHRISTINE",
          "lastName": "MUTESI",
          "phoneNumber": "0740854783",
          "email": "",
          "dob": null,
          "nationalId": "",
          "gender": "Female",
          "nameAbbrev": "MC",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "16:00",
      "endTime": "16:30",
      "lessonDay": "THURSDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "8a0080826ac91ea1016afc3e899a5762",
          "code": "LIB",
          "name": "LIB",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:51",
          "updatedDateTime": "23/11/2022 10:24:15",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1ec001a8d",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "611954",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "13201563412079",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "ELKANAH",
          "lastName": "OLUKA",
          "phoneNumber": "0773004068",
          "email": "olukaelkanah@gmail.com",
          "dob": null,
          "nationalId": "CM780351025X1E",
          "gender": "Male",
          "nameAbbrev": "OE",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "16:00",
      "endTime": "16:30",
      "lessonDay": "FRIDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "8a0080826ac91ea1016afc3e8a0d5766",
          "code": "CAPE 1",
          "name": "CAPE 1",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:51",
          "updatedDateTime": "21/04/2023 03:44:32",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1f9ea1a97",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "890545",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "III/2012/3641",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "JOHN PAUL",
          "lastName": "BOSSA",
          "phoneNumber": "0753626220",
          "email": "bossajohnpaul@gmail.com",
          "dob": null,
          "nationalId": "CM87012102AMLK",
          "gender": "Male",
          "nameAbbrev": "BJ",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "16:30",
      "endTime": "17:00",
      "lessonDay": "WEDNESDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "2c918085797e53c501797e57c5860001",
          "code": "ENG",
          "name": "ENG",
          "subjectClassification": "Primary",
          "createdDateTime": "18/05/2021 10:20:45",
          "updatedDateTime": "23/11/2022 10:03:20",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c3d1701aae",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "397188",
          "staffType": "Teacher",
          "registered": false,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "PHIONAH",
          "lastName": "NAKIBUULE",
          "phoneNumber": "0708980355",
          "email": "",
          "dob": null,
          "nationalId": "",
          "gender": "Female",
          "nameAbbrev": "NP",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "16:30",
      "endTime": "17:00",
      "lessonDay": "TUESDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "8a0080826ac91ea1016afc3e899a5762",
          "code": "LIB",
          "name": "LIB",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:51",
          "updatedDateTime": "23/11/2022 10:24:15",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1ec001a8d",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "611954",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "13201563412079",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "ELKANAH",
          "lastName": "OLUKA",
          "phoneNumber": "0773004068",
          "email": "olukaelkanah@gmail.com",
          "dob": null,
          "nationalId": "CM780351025X1E",
          "gender": "Male",
          "nameAbbrev": "OE",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "16:30",
      "endTime": "17:00",
      "lessonDay": "MONDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "2c91808670e830410170f729b01124a6",
          "code": "CAPE 2",
          "name": "CAPE 2",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:32",
          "updatedDateTime": "21/04/2023 03:45:36",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1e8ad1a8b",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "579943",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "36221563412309",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "ROSE NAMPIIMA",
          "lastName": "BATUUKA",
          "phoneNumber": "0782918380",
          "email": "rosebatuuka@gmail.com",
          "dob": null,
          "nationalId": "CF72030103HDKC",
          "gender": "Female",
          "nameAbbrev": "BR",
          "serviceStatus": "ACTIVE"
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "16:30",
      "endTime": "17:00",
      "lessonDay": "THURSDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "2c91808670e830410170f220e7e60638",
          "code": "COMP",
          "name": "COMP",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:32",
          "updatedDateTime": "21/04/2023 03:59:40",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1ffbb1a9b",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "758629",
          "staffType": "Teacher",
          "registered": false,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "CHRISTINE",
          "lastName": "MUTESI",
          "phoneNumber": "0740854783",
          "email": "",
          "dob": null,
          "nationalId": "",
          "gender": "Female",
          "nameAbbrev": "MC",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "16:30",
      "endTime": "17:00",
      "lessonDay": "FRIDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "8a0080826da55015016dc92bb01153fe",
          "code": "MTC",
          "name": "MTC",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:51",
          "updatedDateTime": "23/11/2022 10:21:43",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1e02c1a85",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "116520",
          "staffType": "Deputy head teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "48341565156600",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "SARAH",
          "lastName": "NASSIMBWA",
          "phoneNumber": "0782584690",
          "email": "sarahnassimbwa70@gmail.com",
          "dob": null,
          "nationalId": "CF700321005JFG",
          "gender": "Female",
          "nameAbbrev": "NS",
          "serviceStatus": "ACTIVE"
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "17:00",
      "endTime": "17:30",
      "lessonDay": "FRIDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "2c918085797e53c501797e57c5860001",
          "code": "ENG",
          "name": "ENG",
          "subjectClassification": "Primary",
          "createdDateTime": "18/05/2021 10:20:45",
          "updatedDateTime": "23/11/2022 10:03:20",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c9a808588560949018865f198f033fd",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "733423",
          "staffType": "Teacher",
          "registered": false,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": null,
          "nationality": null,
          "teachingstaff": false,
          "firstName": "ROGERS",
          "lastName": "MUGABI",
          "phoneNumber": "0753651127",
          "email": "",
          "dob": null,
          "nationalId": "CM761011003A8J",
          "gender": "Male",
          "nameAbbrev": "MR",
          "serviceStatus": "ACTIVE"
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "17:00",
      "endTime": "17:30",
      "lessonDay": "THURSDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "2c91808670e830410170e841f4410060",
          "code": "NUMERACY",
          "name": "NUMERACY",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:32",
          "updatedDateTime": "21/04/2023 03:50:10",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1e5b81a89",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "511149",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "37711560628155",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "TONNY OGAYA",
          "lastName": "OKELLO",
          "phoneNumber": "0775126613",
          "email": "tonnyogaya@gmail.com",
          "dob": null,
          "nationalId": "CM87088100AENL",
          "gender": "Male",
          "nameAbbrev": "OT",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "17:00",
      "endTime": "17:30",
      "lessonDay": "WEDNESDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "ff808081643ff54601643ff789c20004",
          "code": "SST",
          "name": "SST",
          "subjectClassification": "Primary",
          "createdDateTime": "24/04/2021 10:26:51",
          "updatedDateTime": "23/11/2022 10:22:07",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1e5b81a89",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "511149",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "37711560628155",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "TONNY OGAYA",
          "lastName": "OKELLO",
          "phoneNumber": "0775126613",
          "email": "tonnyogaya@gmail.com",
          "dob": null,
          "nationalId": "CM87088100AENL",
          "gender": "Male",
          "nameAbbrev": "OT",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "17:00",
      "endTime": "17:30",
      "lessonDay": "TUESDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "2c92808684cbbcc10184e15bae9c185e",
          "code": "ENG",
          "name": "ENG",
          "subjectClassification": "Secondary",
          "createdDateTime": "05/12/2022 11:16:32",
          "updatedDateTime": "05/12/2022 11:16:32",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c1e8ad1a8b",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "579943",
          "staffType": "Teacher",
          "registered": true,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "36221563412309",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "ROSE NAMPIIMA",
          "lastName": "BATUUKA",
          "phoneNumber": "0782918380",
          "email": "rosebatuuka@gmail.com",
          "dob": null,
          "nationalId": "CF72030103HDKC",
          "gender": "Female",
          "nameAbbrev": "BR",
          "serviceStatus": "ACTIVE"
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  },
  {
      "id": null,
      "startTime": "17:00",
      "endTime": "17:30",
      "lessonDay": "MONDAY",
      "schoolClass": {
          "id": "2c9a80888861e997018861eb9f0076d7",
          "code": "P.1",
          "name": "P.1",
          "hasStreams": false,
          "classLevel": true,
          "createdDateTime": "28/05/2023 10:33:31",
          "updatedDateTime": "28/05/2023 10:33:31",
          "status": "Active"
      },
      "subject": {
          "id": "2c918085797e53c501797e57c5860001",
          "code": "ENG",
          "name": "ENG",
          "subjectClassification": "Primary",
          "createdDateTime": "18/05/2021 10:20:45",
          "updatedDateTime": "23/11/2022 10:03:20",
          "status": "Active"
      },
      "schoolStaff": {
          "id": "2c928086852f251f018534c3d1811ab0",
          "name": null,
          "createdDateTime": null,
          "updatedDateTime": null,
          "status": "Active",
          "staffCode": "455791",
          "staffType": "Others",
          "registered": false,
          "school": {
              "id": "2c92808282d44b4a0182d4931c1a11ac",
              "name": "KIRA P.S",
              "district": {
                  "id": "2c9280828214e0b3018221d4deec1b22",
                  "name": "Kira Municipality"
              }
          },
          "registrationNo": "",
          "nationality": "UGANDAN",
          "teachingstaff": false,
          "firstName": "BENSON",
          "lastName": "KWIZERA",
          "phoneNumber": "0785092442",
          "email": "",
          "dob": null,
          "nationalId": "",
          "gender": "Male",
          "nameAbbrev": "KB",
          "serviceStatus": null
      },
      "duration": 30,
      "breakStartTime": "10:30",
      "breakEndTime": "11:00",
      "lunchStartTime": "13:00",
      "lunchEndTime": "14:00",
      "classStartTime": "08:30",
      "classEndTime": "17:00"
  }
]
