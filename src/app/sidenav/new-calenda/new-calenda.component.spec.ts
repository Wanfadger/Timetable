import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCalendaComponent } from './new-calenda.component';

describe('NewCalendaComponent', () => {
  let component: NewCalendaComponent;
  let fixture: ComponentFixture<NewCalendaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewCalendaComponent]
    });
    fixture = TestBed.createComponent(NewCalendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
