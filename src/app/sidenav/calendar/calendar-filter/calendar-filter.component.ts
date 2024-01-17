import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, switchMap, of, startWith, map, debounceTime, distinctUntilChanged } from 'rxjs';
import { AcademicYear, AcademicTerm } from 'src/app/dto/dto';
import { District, SchoolFilterService } from 'src/shared/school-filter/school-filter.service';

@Component({
  selector: 'app-calendar-filter',
  templateUrl: './calendar-filter.component.html',
  styleUrls: ['./calendar-filter.component.scss']
})
export class CalendarFilterComponent implements OnInit {

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


  filteredCalendarDetails:FilteredCalendarDetails = {year:null,term:null}

  @Output() SelectedCalendarDetailEvent:EventEmitter<FilteredCalendarDetails> = new EventEmitter();

  constructor(private schoolFilterService:SchoolFilterService , private toastr:ToastrService) { }

  ngOnInit() {
    this.getAllAcademicYears()

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
            this.filteredCalendarDetails = {... this.filteredCalendarDetails , year:value}
            this.SelectedCalendarDetailEvent.next(this.filteredCalendarDetails)
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
              this.filteredCalendarDetails = {... this.filteredCalendarDetails , term:value}
              this.SelectedCalendarDetailEvent.next(this.filteredCalendarDetails)
              return [value]
            }
          }
        })
      )


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



  sortFunction(a:AcademicYear, b:AcademicYear , sortOrder:SortOrder=SortOrder.ASC):number{
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

export interface FilteredCalendarDetails{
  year:AcademicYear|null
  term:AcademicTerm|null
 }
