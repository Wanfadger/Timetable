import { Injectable } from '@angular/core';
import { PublicHoliday } from './calendat.dto';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private HOLIDAYS:PublicHoliday[] = []
  holidays$ = new BehaviorSubject<PublicHoliday[]>([]);

  constructor() { }

  add(holidays: PublicHoliday){
    this.HOLIDAYS.push(holidays);
    this.holidays$.next(this.HOLIDAYS)
  }

  get():Observable<PublicHoliday[]>{
    return this.holidays$;
  }

  delete(name:string):void{
    const index = this.HOLIDAYS.findIndex(h => h.name ===name)
    this.HOLIDAYS.splice(index, 1)
    this.holidays$.next(this.HOLIDAYS)
  }






}
