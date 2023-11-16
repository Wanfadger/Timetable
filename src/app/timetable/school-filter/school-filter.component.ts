
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { District, Region, School, SchoolFilterService, SchoolStaffWithSchool_DistrictDto } from './school-filter.service';
import { FormControl, Validators } from '@angular/forms';
import { Observable, Subject, debounceTime, distinctUntilChanged, map, of, startWith, switchMap } from 'rxjs';
import { AcademicTerm, AcademicYear, SchoolClass, SchoolStaff, SchoolSubject } from '../../dto/dto';
import { HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-school-filter',
  templateUrl: './school-filter.component.html',
  styleUrls: ['./school-filter.component.scss']
})

export class SchoolFilterComponent implements OnInit {
  regionControl: FormControl = new FormControl(null);
  filteredRegions$: Observable<Region[]> | undefined = new Subject();
  selectedRegion$: Subject<Region> = new Subject();
  regionList: Region[] = [];
  isLoadingRegions: Boolean = false;

  localGovernmentControl: FormControl = new FormControl(null);
  filteredLocalGovernments$: Observable<District[]> | undefined = new Subject();
  selectedLocalGovernment$: Subject<District> = new Subject();
  localGovernmentList: District[] = [];
  isLoadingLocalGovernments: Boolean = false;


  schoolControl: FormControl = new FormControl(null);
  filteredSchools$: Observable<School[]> | undefined = new Subject();
  selectedSchool$: Subject<School> = new Subject();
  schoolList: School[] = [];
  isLoadingSchools: Boolean = false;
  school:{name:string , id:string} = {name:"" , id:""}


  yearControl: FormControl = new FormControl(null);
  filteredYears$: Observable<AcademicYear[]> | undefined = new Subject();
  selectedYear$: Subject<AcademicYear> = new Subject();
  yearList: AcademicYear[] = [];
  isLoadingYears: Boolean = false;

  termControl: FormControl = new FormControl(null);
  filteredTerms$: Observable<AcademicTerm[]> | undefined = new Subject();
  selectedTerm$: Subject<AcademicTerm> = new Subject();
  termList: AcademicTerm[] = [];
  isLoadingTerms: Boolean = false;

  schoolLevelControl:FormControl = new FormControl(null , Validators.required);

  filteredSchoolDetails:FilteredSchoolDetails = {region:null,localGovernment:null,schoolLevel:"",year:null,term:null,school:null,staffList:[]  ,schoolClasses:[] , subjects:[]}

  @Output() SelectedSchoolDetailEvent:EventEmitter<FilteredSchoolDetails> = new EventEmitter();

  constructor(private schoolFilterService:SchoolFilterService , private toastr:ToastrService) { }

  ngOnInit() {
    this.getAllAcademicYears()
    this.getAllRegions()
    this.getAllSubjects()

    this.schoolLevelControl.valueChanges.pipe(switchMap((value) => {
    //  console.log(this.localGovernmentControl.value)
      this.filteredSchoolDetails = {... this.filteredSchoolDetails , schoolLevel:value}
        this.SelectedSchoolDetailEvent.next(this.filteredSchoolDetails)
      if(value == "" || !this.localGovernmentControl.value){
        return of(null)
      }else{
        this.isLoadingSchools = true;

        const params =  new HttpParams()
        .set("district", this.localGovernmentControl.value.id)
        .set("schoolLevel", this.schoolLevelControl.value)
        return this.schoolFilterService.getSchools(params);
      }
    })).subscribe({
      next: (res) => {
        if(res != null){
          this.isLoadingSchools = false
          if (res.status) {
            // console.log(" SCHOOLS " , res)
            this.schoolList = res.data.sort(this.sortFunction);
            this.schoolControl.patchValue('')
          }
        }
      },
      error: (error) => {
        this.isLoadingSchools = false
        console.log(error);
      },
    });

    this.filteredRegions$ = this.regionControl.valueChanges.pipe(
      startWith(""),
      map((value: string | Region) => {
        if(value === ""){
          return this.regionList
        }else{
        if (typeof value === "string") {
          return this.regionList.filter(lg => lg.name.toLowerCase().includes(value))
        } else {
          this.selectedRegion$.next(value)
          this.filteredSchoolDetails = {... this.filteredSchoolDetails , region:value}
          this.SelectedSchoolDetailEvent.next(this.filteredSchoolDetails)
          return [value]
        }
        }
      })
    )



    this.selectedRegion$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((region: Region) => {
        this.isLoadingLocalGovernments = true
        return this.schoolFilterService.getDistricts(new HttpParams().set('region', region.id))
      })).subscribe({
        next: (res) => {
          this.isLoadingLocalGovernments = false
          if (res.status) {
            this.localGovernmentList = res.data.sort(this.sortFunction);
            this.localGovernmentControl.patchValue("")
          }
        },
        error: (error) => {
          this.isLoadingLocalGovernments = false
          console.log(error);
        },
      })


    this.filteredLocalGovernments$ = this.localGovernmentControl.valueChanges.pipe(
      startWith(""),
      map((value: string | District) => {
        if(value === ""){
          return this.localGovernmentList
        }else{
          if (typeof value === "string") {
            return this.localGovernmentList.filter(lg => lg.name.toLowerCase().includes(value))
          } else {
            this.selectedLocalGovernment$.next(value)
            this.filteredSchoolDetails = {... this.filteredSchoolDetails , localGovernment:value}
          this.SelectedSchoolDetailEvent.next(this.filteredSchoolDetails)
            return [value]
          }
        }
      })
    )

    this.selectedLocalGovernment$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((district: District) => {
         this.isLoadingSchools = true;

        const params =  new HttpParams()
        .set("district", district.id)
        .set("schoolLevel", this.schoolLevelControl.value)
        return this.schoolFilterService.getSchools(params);
      })).subscribe({
        next: (res) => {
          this.isLoadingSchools = false
          if (res.status) {
            // console.log("SELECTED SCHOOL " , res)
            this.schoolList = res.data.sort(this.sortFunction);
            this.schoolControl.patchValue('')
          }
        },
        error: (error) => {
          this.isLoadingSchools = false
          console.log(error);
        },
      })


    // school

    this.filteredSchools$ = this.schoolControl.valueChanges.pipe(
      startWith(""),
      map((value: string | School) => {
       if(value === ""){
        return this.schoolList
       }else{
        if (typeof value === "string") {
          return this.schoolList.filter(lg => lg.name.toLowerCase().includes(value))
        } else {
          this.selectedSchool$.next(value)
          this.filteredSchoolDetails = {... this.filteredSchoolDetails , school:value}
          this.SelectedSchoolDetailEvent.next(this.filteredSchoolDetails)
          return [value]
        }
       }
      })
    )


    this.selectedSchool$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((school: School) => {
        const params = new HttpParams()
          .set("school", school.id)
        //.set("schoolLevel", this.schoolLevelControl.value)
        return this.schoolFilterService.searchStaff(params);
      })).subscribe({
        next: (res) => {
          // console.log("class staff " , res)
          if (res.status) {
            this.filteredSchoolDetails = {... this.filteredSchoolDetails , staffList:res.data}
            this.SelectedSchoolDetailEvent.next(this.filteredSchoolDetails)
          // console.log("staff " , res.data)
          }
        },
        error: (error) => {
          console.log(error);
        },
      })


    // YEAR

    this.filteredYears$ = this.yearControl.valueChanges.pipe(
      startWith(""),
      map((value: string | AcademicYear) => {
        if(value === ""){
          return this.yearList
        }else{
          if (typeof value === "string") {
            return this.yearList.filter(lg => lg.name.toLowerCase().includes(value))
          } else {
            this.selectedYear$.next(value)
            this.filteredSchoolDetails = {... this.filteredSchoolDetails , year:value}
            this.SelectedSchoolDetailEvent.next(this.filteredSchoolDetails)
            return [value]
          }
        }
      })
    )

    this.selectedYear$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((year: AcademicYear) => {
        this.isLoadingTerms = true
        return this.schoolFilterService.getAcademicTerms(new HttpParams().set('academicYear', year.id))
      })).subscribe({
        next: (response) => {
          this.isLoadingTerms = false
          if (response.status) {
            this.termList = response.data.sort((a,b) =>  this.sortTerm(a,b,SortOrder.DESC));
            this.termControl.patchValue('')
          }
        },
        error: (error) => {
          this.isLoadingTerms = false
          console.log(error);
        },
      })


      this.filteredTerms$ = this.termControl.valueChanges.pipe(
        startWith(""),
        map((value: string | AcademicTerm) => {
          if(value === ""){
            return this.termList
          }else{
            if (typeof value === "string") {
              return this.termList.filter(lg => lg.term.toLowerCase().includes(value))
            } else {
              this.selectedTerm$.next(value)
              this.filteredSchoolDetails = {... this.filteredSchoolDetails , term:value}
              this.SelectedSchoolDetailEvent.next(this.filteredSchoolDetails)
              return [value]
            }
          }
        })
      )


      /// school Class by academic term , school
     this.selectedTerm$.pipe(
      switchMap( term => {
        // get school data
        if(this.schoolControl.value){
          let params = new HttpParams()
          .set("academicTerm" , term.id).set("school" , this.schoolControl.value.id)
          return this.schoolFilterService.getSchoolClasses(params)
        }else{
         return of(null)
        }
      })
     ).subscribe({
      next:response => {
       // console.log("class response" , response)
        if(response){
          this.filteredSchoolDetails = {... this.filteredSchoolDetails , schoolClasses:response?.data.sort(this.sortFunction)||[]}
              this.SelectedSchoolDetailEvent.next(this.filteredSchoolDetails)
        }
      },
      error:error => console.log("error" , error)
     })

     this.selectedSchool$.pipe(
      switchMap( school => {
        // get school data
        if(this.termControl.value){
          let params = new HttpParams()
          .set("academicTerm" , this.termControl.value.id)
          .set("school" , school.id)
          return this.schoolFilterService.getSchoolClasses(params)
        }else{
         return of(null)
        }
      })
     ).subscribe({
      next:response => {
        // console.log("class response" , response)
        if(response){
          // console.log("class response " , response)
          this.filteredSchoolDetails = {... this.filteredSchoolDetails , schoolClasses:response?.data.sort(this.sortFunction) ||[]}
              this.SelectedSchoolDetailEvent.next(this.filteredSchoolDetails)
        }
      },
      error:error => console.log("error" , error)
     })



  }

  showStaffList() {
    if (this.filteredSchoolDetails?.staffList) {
      this.toastr.info(`${this.filteredSchoolDetails?.school?.name} staff list
      ${this.filteredSchoolDetails?.staffList.map((staff, index) => `${index + 1} ${staff.firstName} ${staff.lastName}`).join("\n")}`)

      console.log(this.filteredSchoolDetails?.staffList.map((staff, index) => `${index + 1} ${staff.firstName} ${staff.lastName}`))
    }
  }

  showSchoolClasses() {
    if (this.filteredSchoolDetails?.schoolClasses) {
      this.toastr.info(`${this.filteredSchoolDetails?.school?.name} staff list
      ${this.filteredSchoolDetails?.schoolClasses.map((scchoolClass, index) => `${index + 1} ${scchoolClass.name}`).join("\n")}`)
    }
  }

  getAllSubjects() {
    this.schoolFilterService.getAllSubjects(new HttpParams()).subscribe({
      next: (res) => {
        this.isLoadingYears = false
        if (res.status) {
          // console.log("Subjects ", res.data)
          // console.log(res.data.map(D => D.code))
          const subs = res.data.filter(sub => sub.subjectClassification != null)
          // console.log("Subjects ", subs)
          this.filteredSchoolDetails = {... this.filteredSchoolDetails , subjects:subs||[]}
          this.SelectedSchoolDetailEvent.next(this.filteredSchoolDetails)
        }
      },
      error: (error) => {
        console.log(error);
        this.isLoadingYears = false
      }
    })
  }


  getAllAcademicYears() {
    this.isLoadingYears = true
    this.schoolFilterService.getAllAcademicYears().subscribe({
      next: (res) => {
        this.isLoadingYears = false
        if (res.status) {
          // console.log("YEARS ", res.data)
          this.yearList = res.data.sort((a,b) =>  this.sortFunction(a,b,SortOrder.DESC))
          this.yearControl.patchValue('')
        }
      },
      error: (error) => {
        console.log(error);
        this.isLoadingYears = false
      }
    })
  }


  getAllRegions() {
    this.isLoadingRegions = true;
    this.schoolFilterService.getRegions(new HttpParams()).subscribe({
      next: (res) => {
        this.isLoadingRegions = false;
        if (res.status) {
          this.regionList = res.data.sort(this.sortFunction);
          this.regionControl.patchValue('')
          // this.selected = res.data[0]
          // console.log(this.selected.code);
        }
      },
      error: (error) => {
        this.isLoadingRegions = false;
        console.log(error);
      }
    })
  }



  sortFunction(a:Region|District|School, b:Region|District|School , sortOrder:SortOrder=SortOrder.ASC):number{
    if(sortOrder == SortOrder.DESC){
      if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
        return 1;
      }
      if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
        return -1;
      }
    }else{
      if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
        return -1;
      }
      if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
        return 1;
      }
    }


    // names must be equal
    return 0;
  }

  sortTerm(a:AcademicTerm, b:AcademicTerm,sortOrder:SortOrder=SortOrder.ASC):number{

    if(sortOrder == SortOrder.DESC){
      if (a.term.toLocaleLowerCase() < b.term.toLocaleLowerCase()) {
        return 1;
      }
      if (a.term.toLocaleLowerCase() > b.term.toLocaleLowerCase()) {
        return -1;
      }
    }else{
      if (a.term.toLocaleLowerCase() < b.term.toLocaleLowerCase()) {
        return -1;
      }
      if (a.term.toLocaleLowerCase() > b.term.toLocaleLowerCase()) {
        return 1;
      }
    }



    // names must be equal
    return 0;
  }



  displayWith(value: District |AcademicYear| null) {
    return value ? value.name : ""
  }

  displayWithTerm(value: AcademicTerm| null) {
    return value ? value.term : ""
  }
}

enum SortOrder{
  ASC , DESC
}

export interface FilteredSchoolDetails{
  region:Region|null
  localGovernment:District|null
  schoolLevel:string,
  year:AcademicYear|null
  term:AcademicTerm|null
  school:School|null
  staffList:SchoolStaffWithSchool_DistrictDto[]
  schoolClasses:SchoolClass[]
  subjects:SchoolSubject[]
 }
