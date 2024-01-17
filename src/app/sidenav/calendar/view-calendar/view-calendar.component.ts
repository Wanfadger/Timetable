import { DateTimeFormatter, LocalDate, TemporalAdjusters, DayOfWeek, Month } from '@js-joda/core';
import { Component, OnInit, inject, signal } from '@angular/core';
import { Dictionary, groupBy } from 'lodash';
import { AcademicTerm } from 'src/app/dto/dto';
import { FilteredCalendarDetails } from '../calendar-filter/calendar-filter.component';
import { CalendarService } from '../calendar.service';
import { PublicHoliday } from '../calendat.dto';

@Component({
  selector: 'app-view-calendar',
  templateUrl: './view-calendar.component.html',
  styleUrls: ['./view-calendar.component.scss']
})
export class ViewCalendarComponent implements OnInit {

  currentTerm: AcademicTerm | null = null
  calendarService:CalendarService = inject(CalendarService)

  daysOfWeek: DayOfWeek[] = DayOfWeek.values().filter(d => !(d.equals(DayOfWeek.SUNDAY) || d.equals(DayOfWeek.SATURDAY)))
  LOCAL_DATE_Formatter = DateTimeFormatter.ofPattern("d")

  termMonth = signal<string[]>([])
  termDates = signal<LocalDate[]>([])
  datesByMonth = signal<Dictionary<LocalDate[]>>({})
  datesByDayOfWeek = signal<Dictionary<LocalDate[]>>({})
  holidays = signal<PublicHoliday[]>([])


  onSelectedCalendarDetailEvent(filteredSchoolDetails: FilteredCalendarDetails) {

    if (this.currentTerm?.id != filteredSchoolDetails.term?.id) {
      this.currentTerm = filteredSchoolDetails.term
      const sD = LocalDate.parse(this.currentTerm?.startDate as string, DateTimeFormatter.ofPattern("dd/MM/yyyy"))
      const eD = LocalDate.parse(this.currentTerm?.endDate as string, DateTimeFormatter.ofPattern("dd/MM/yyyy"))


      const termMonthlyDates: LocalDate[] = this.datesBetweenBothInclusive(sD, eD)
        .filter(d => !(d.dayOfWeek().equals(DayOfWeek.SUNDAY) || d.dayOfWeek().equals(DayOfWeek.SATURDAY)))
      this.termDates.update(() => termMonthlyDates)

      this.datesByMonth.update(() => this.groupByMonth(termMonthlyDates))
      this.termMonth.update(() => Object.keys(this.datesByMonth()))



    }
  }

  ngOnInit(): void {
   this.getHolidays()
  }

  datesBetweenBothInclusive(startDate: LocalDate, endDate: LocalDate) {
    let s = startDate
    const dates: LocalDate[] = []
    for (let i = 0; s.isBefore(endDate) || s.isEqual(endDate.minusDays(1)); i++) {
      s = startDate.plusDays(i)
      dates.push(s)
    }
    return dates;
  }


  datesBetweenEndExclusive(startDate: LocalDate, endDate: LocalDate) {
    let s = startDate
    const dates: LocalDate[] = []
    for (let i = 0; s.isBefore(endDate.minusDays(1)); i++) {
      s = startDate.plusDays(i)
      dates.push(s)
    }
    return dates;
  }

  datesBetweenBothExclusive(startDate: LocalDate, endDate: LocalDate) {
    let s = startDate
    const dates: LocalDate[] = []
    for (let i = 1; s.isBefore(endDate.minusDays(1)); i++) {
      s = startDate.plusDays(i)
      dates.push(s)
    }
    return dates;
  }

  getMonthHolidays(month:string):LocalDate[] {
    return  this.holidays().filter(d => d.date.month().name() == month).map(d => d.date)
   }

   isMonthHolidays(monthDate:LocalDate , monthHolidays:LocalDate[]):boolean {
    return monthHolidays.find(mh => mh.equals(monthDate)) ? true : false
   }


  getHolidays() {
    this.calendarService.getPublicHolidays().subscribe(holidays => {
     this.holidays.update(() => holidays)

    // console.log("holidays " , this.getMonthHolidays(LocalDate.now().month().name()))
    })
   }

  groupByDayOfWeek(dates: LocalDate[]): Dictionary<LocalDate[]> {
    return groupBy(dates, (date) => date.dayOfWeek().name())
  }

  groupByMonth(dates: LocalDate[]): Dictionary<LocalDate[]> {
    return groupBy(dates.filter(date => date.month()), (date) => date.month())
  }

}
