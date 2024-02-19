import { Component, ViewEncapsulation } from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';

@Component({
  selector: 'app-new-calenda',
  templateUrl: './new-calenda.component.html',
  styleUrls: ['./new-calenda.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewCalendaComponent {
  selected!: Date | null;
  showTooltip = false;
  tooltipText = '';
  tooltipPosition = { x: '0px', y: '0px' };


  publicHolidays: any[] = [
    '1/1',  // New Year's Day
    '1/26', // NRM Liberation Day
    '2/16',//JANAN LUWUM
    '3/8',  // International Women's Day
    '4/2',  // Good Friday (adjust for the current year)
    '5/1',  // Labour Day
    '6/3',  // Martyrs' Day
    '6/9',  // National Heroes Day
    '10/9', // Independence Day
    '12/25',// Christmas Day
    '12/26' // Boxing Day
  ];

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      const monthDay = `${cellDate.getMonth() + 1}/${cellDate.getDate()}`;
      return this.publicHolidays.includes(monthDay) ? 'public-holiday' : {};
    }
    return {};
  };

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // DISABLE SUNDAY AND SATURDAY.
    return day !== 0 && day !== 6;
  };


}
