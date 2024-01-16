import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PublicHoliday } from '../calendat.dto';
import { MatDialog } from '@angular/material/dialog';
import { CalendarService } from '../calendar.service';
import { NewEditPublicHolidayComponent } from './new-edit-public-holiday/new-edit-public-holiday.component';
import { ToastrService } from 'ngx-toastr';
import { ConfirmComponent } from 'src/shared/confirm/confirm.component';

@Component({
  selector: 'app-public-holidays',
  templateUrl: './public-holidays.component.html',
  styleUrls: ['./public-holidays.component.scss']
})
export class PublicHolidaysComponent implements OnInit, AfterViewInit {

  public calendarService: CalendarService = inject(CalendarService)
  public toastrService: ToastrService = inject(ToastrService)


  displayedColumns = ['position', 'name', 'date', 'description', 'action'];
  dataSource = new MatTableDataSource<PublicHoliday>([]);

  @ViewChild(MatSort) sort !: MatSort;
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  public dialog: MatDialog = inject(MatDialog)




  holidays = signal<PublicHoliday[]>([]);
  loading = signal(false);

  ngOnInit(): void {
    this.getHolidays()
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  drop(event: any) {
    event = <CdkDragDrop<string[]>>event
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }

  add() {
    this.dialog.open(NewEditPublicHolidayComponent, {disableClose: true, data:null ,  height: '50%',width: '40%',
    });
  }

  edit(holiday: PublicHoliday) {
    this.dialog.open(NewEditPublicHolidayComponent, {disableClose: true, data:holiday ,  height: '50%',width: '40%',
  });
  }

  delete(holiday: PublicHoliday) {
    this.dialog.open(ConfirmComponent, {disableClose: true, data:holiday ,  height: '50%',width: '40%',
  }).afterClosed().subscribe(result => {
    if (result) {
      this.calendarService.delete(holiday.name)
      this.toastrService.success("deleted")
    }
  })
  }


  getHolidays() {
   this.calendarService.get().subscribe(holidays => {
    this.dataSource.data = holidays
   })
  }


}
