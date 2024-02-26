import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingClockPageComponent } from './booking-clock-page.component';

describe('BookingClockPageComponent', () => {
  let component: BookingClockPageComponent;
  let fixture: ComponentFixture<BookingClockPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingClockPageComponent]
    });
    fixture = TestBed.createComponent(BookingClockPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
