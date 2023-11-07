import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AcademicTerm, AcademicYear, SchoolSubject, SchoolTimeTable } from '../dto/dto';

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
    return this._http.post<ResponseDto<string>>(`${environment.BASE_URL}/timetables` , schoolTimeTable).pipe(retry(3))
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
